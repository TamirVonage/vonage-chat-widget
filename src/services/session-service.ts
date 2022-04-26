import { Message } from "../message";

export class SessionService {
    async init(agentId: string, key: string): Promise<{ id: string, token: string }> {
        const res = await fetch('https://stairway.ai.vonage.com/http/init', {
            method: 'POST',
            body: JSON.stringify({
                agent_id: agentId
            }),
            headers: {
                'x-vgai-key': key
            },
            mode: 'no-cors'
        })

        const parsedRes = await res.json()
        return {
            id: parsedRes.session_id,
            token: parsedRes.session_token
        }
    }

    async step(sessionId: string, sessionToken: string, input = null): Promise<{ status: string, messages: Message[] }> {
        const res = await fetch(`https://stairway.ai.vonage.com/http/${sessionId}/step`, {
            method: 'POST',
            body: JSON.stringify({
               input
            }),
            headers: {
                'Authorization': `Bearer ${sessionToken}`
            }
        })

        const parsedRes = await res.json()
        return {
            status: parsedRes.session_status,
            messages: parsedRes.messages
        }
    }
}
