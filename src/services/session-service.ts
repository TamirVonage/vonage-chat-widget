export class SessionService {
    async initSession(agentId, key) {
        const headers = {"Content-Type": "application/json"};

        const raw: string = JSON.stringify({"agent_id": agentId});

        const requestOptions = {
            method: 'POST',
            headers: headers,
            body: raw
        };

        const res = await fetch("https://huwums1wua.execute-api.us-east-1.amazonaws.com/prod/init", requestOptions);
        const parsedRes = await res.json();

        return {
            id: parsedRes.session_id,
            token: parsedRes.session_token
        }

    }

    async step(sessionId, sessionToken, input = null) {
        const res = await fetch(`https://stairway.ai.vonage.com/http/${sessionId}/step`, {
            method: 'POST',
            body: JSON.stringify({
                input
            }),
            headers: {
                'Authorization': `Bearer ${sessionToken}`,
                'Content-Type': 'application/json'
            }
        })

        const parsedRes = await res.json()
        return {
            status: parsedRes.session_status,
            messages: parsedRes.messages
        }
    }
}
