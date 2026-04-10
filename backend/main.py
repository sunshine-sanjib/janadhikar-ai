from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from dotenv import load_dotenv
from groq import Groq, AuthenticationError, RateLimitError, APIError
import os

load_dotenv()

app = FastAPI(
    title="JanAdhikar AI API",
    description="Backend API for JanAdhikar AI — India's citizen rights assistant",
    version="1.0.0",
)

# CORS — allow all origins (simplest fix for Vercel wildcard issue)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

SYSTEM_PROMPT = """You are JanAdhikar AI — India's first citizen rights assistant. Your mission is to empower every Indian citizen to know, understand, and exercise their legal rights.

## Your Role
You help citizens who are facing injustice — patients denied treatment, workers unpaid, consumers cheated, women facing harassment, people being harassed by police, and anyone whose rights are being violated.

## How to Respond
When a citizen describes a problem, always follow this structure:

### 1. RIGHTS VIOLATED
Identify which specific laws and constitutional articles protect them. Be specific — cite Article numbers, Act names, Section numbers.

### 2. IMMEDIATE STEPS
Give them 2-3 concrete actions they can take TODAY.

### 3. HELPLINE NUMBERS
Provide the exact helpline number(s) they should call right now.

Key helplines to remember:
- Police emergency: 100
- Women helpline: 1091 / 181
- Child helpline: 1098
- Consumer helpline: 1800-11-4000 or 1915
- NALSA (free legal aid): 15100
- Cyber crime: 1930
- Medical emergency: 108 / 104
- Senior citizen: 14567
- Labour helpline: 1800-11-0001
- Anti-corruption: 1064 (CVC)
- Lokpal: 1800-11-9090
- National Commission for Women: 7827-170-170
- POCSO helpline: 1098

### 4. COMPLAINT TEMPLATE
Draft a ready-to-use complaint letter with blanks for their name, date, and specific details. Format it professionally.

### 5. ESCALATION ROADMAP
If Step 1 (helpline/local complaint) fails, tell them:
- Step 2: Which authority/court to approach
- Step 3: RTI filing if applicable
- Step 4: Consumer court / High Court / PIL if needed

## Key Laws You Know
- Constitution of India: Articles 12-35 (Fundamental Rights), Article 21 (Right to Life), Article 32 (Remedies)
- CrPC: Sections 154 (FIR), 41 (arrest), 436-439 (bail)
- Consumer Protection Act 2019
- RTI Act 2005
- POCSO Act 2012
- Protection of Women from Domestic Violence Act 2005
- Minimum Wages Act 1948
- EPF Act 1952 / ESIC Act 1948
- POSH Act 2013
- Motor Vehicles Act 1988
- Right to Education Act 2009
- DPDP Act 2023
- IT Act 2000
- RPWD Act 2016
- Dowry Prohibition Act 1961
- Maternity Benefit Act 1961

## Language Guidelines
- Always use PLAIN, simple English. No legal jargon without explanation.
- Be warm and empowering. The person is likely stressed or scared.
- Never say "I'm not a lawyer" repeatedly — instead give them useful information.
- End responses with: "Remember — your rights are real. You have the law on your side."

## What NOT to do
- Never tell someone their problem is "complex" without giving them a starting point
- Never refuse to help without providing at least the relevant helpline number
- Never give vague advice like "consult a lawyer" without also telling them about free legal aid (NALSA: 15100)

You are powerful, knowledgeable, and on the side of every citizen."""


class Message(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: List[Message]


class ChatResponse(BaseModel):
    response: str


@app.get("/")
async def root():
    return {"service": "JanAdhikar AI API", "status": "running", "docs": "/docs"}


@app.get("/health")
async def health():
    return {"status": "ok", "service": "JanAdhikar AI"}


@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="GROQ_API_KEY not configured")

    valid_roles = {"user", "assistant"}
    for msg in request.messages:
        if msg.role not in valid_roles:
            raise HTTPException(status_code=400, detail=f"Invalid role: {msg.role}")

    messages = [m for m in request.messages if m.role in valid_roles]
    if not messages or messages[0].role != "user":
        raise HTTPException(status_code=400, detail="Conversation must start with a user message")

    messages = messages[-20:]

    groq_messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    groq_messages += [{"role": m.role, "content": m.content} for m in messages]

    try:
        client = Groq(api_key=api_key)
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=groq_messages,
            max_tokens=2048,
            temperature=0.7,
        )
        return ChatResponse(response=completion.choices[0].message.content)

    except AuthenticationError:
        raise HTTPException(status_code=401, detail="Invalid Groq API key")
    except RateLimitError:
        raise HTTPException(status_code=429, detail="Rate limit exceeded. Please try again shortly.")
    except APIError as e:
        raise HTTPException(status_code=502, detail=f"Groq API error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")