// kode simpel untuk server biasa aja ya
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// encode private dari flag nya, jadi kalau kek kali nya banyak atau pun bagi maka hasilnya juga flag yang sembarang
const ENCODED_RESPONSES = {
    special: {
        "1945+1945": "agrihack{yeY_D0_yu0_slv3_t1H5}",
        "2+2": "matrix{d0ubl3_4g3nt_c0nf1rm3d}",
        "5*5": "power{unl1m1t3d_p0w3r_unl0ck3d}",
        "10-10": "nullhack{v01d_d3t3ct3d_1n_m4tr1x}",
        "7*7": "lucky{s3v3n_t1m3s_s3v3n_m4g1c}"
    },
    simple: [
        "codehunt{m4tH_w1z4rd_f0unD}",
        "cryptex{n0_w4y_th4t_w4s_e4sy}",
        "solver{1nc0rr3ct_c4lcul4t10n}",
        "hacker{br34k1ng_th3_c0d3}"
    ],
    advanced: [
        "matrix{f0ll0w_th3_wh1t3_r4bb1t}",
        "cipher{th3_k3y_1s_h1dd3n}",
        "quantum{3nt4ngl3d_s0lut10n}",
        "neural{4ct1v4t10n_c0mpl3t3}"
    ]
};

// nah disini math sederhana yang dapat dilakukan request biasa tanpa pake pwn
app.post('/api/encode-math', (req, res) => {
    try {
        const { num1, operator, num2, result } = req.body;
        const operation = `${num1}${operator}${num2}`;
        
        console.log(`Math request: ${operation} = ${result}`);
        
        // server bisa langsung nge cek respon
        if (ENCODED_RESPONSES.special[operation]) {
            return res.json({
                encoded: ENCODED_RESPONSES.special[operation],
                type: 'special'
            });
        }
        
        // nah ini dia untuk generated real code
        let category, encodedResponse;
        
        if (result === 0) {
            encodedResponse = "nullhack{v01d_d3t3ct3d_1n_m4tr1x}";
        } else if (result < 10) {
            category = 'simple';
            const responses = ENCODED_RESPONSES.simple;
            encodedResponse = responses[Math.floor(Math.random() * responses.length)];
        } else {
            category = 'advanced';
            const responses = ENCODED_RESPONSES.advanced;
            encodedResponse = responses[Math.floor(Math.random() * responses.length)];
        }
        
        res.json({
            encoded: encodedResponse,
            type: category || 'zero'
        });
        
    } catch (error) {
        console.error('Math encoding error:', error);
        res.status(500).json({ error: 'Encoding failed' });
    }
});

// untuk tetap terpantau aja
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        message: 'Simple Secure AI running'
    });
});

// ini kek frontend nya
app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple Secure AI</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }

        .chat-container {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            width: 100%;
            max-width: 500px;
            height: 600px;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        .chat-header {
            background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
            color: white;
            padding: 20px;
            text-align: center;
            font-size: 1.2rem;
            font-weight: 600;
        }

        .status-bar {
            padding: 10px 20px;
            background: #e8f5e8;
            border-left: 4px solid #4caf50;
            font-size: 12px;
            color: #2e7d32;
            text-align: center;
        }

        .help-text {
            padding: 10px 20px;
            background: #f9f9f9;
            font-size: 11px;
            color: #666;
            text-align: center;
        }

        .chat-messages {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        .message {
            padding: 12px 16px;
            border-radius: 15px;
            max-width: 85%;
            word-wrap: break-word;
            animation: fadeIn 0.3s ease;
        }

        .user-message {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            align-self: flex-end;
            border-bottom-right-radius: 5px;
        }

        .ai-message {
            background: #f0f0f0;
            color: #333;
            align-self: flex-start;
            border-bottom-left-radius: 5px;
        }

        .encoded-message {
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            color: #00ff00;
            align-self: flex-start;
            border-bottom-left-radius: 5px;
            font-family: 'Courier New', monospace;
            font-weight: bold;
            border: 1px solid #00ff00;
            box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
        }

        .chat-input {
            display: flex;
            padding: 20px;
            background: #f8f9fa;
            border-top: 1px solid #e9ecef;
        }

        .input-field {
            flex: 1;
            padding: 12px 16px;
            border: 1px solid #ddd;
            border-radius: 25px;
            outline: none;
            font-size: 14px;
            transition: border-color 0.3s;
        }

        .input-field:focus {
            border-color: #ff6b6b;
        }

        .send-button {
            margin-left: 10px;
            padding: 12px 20px;
            background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
            color: white;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 600;
            transition: transform 0.2s;
        }

        .send-button:hover {
            transform: scale(1.05);
        }

        .send-button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }

        .typing-indicator {
            display: none;
            padding: 12px 16px;
            background: #f0f0f0;
            border-radius: 15px;
            max-width: 80%;
            align-self: flex-start;
            border-bottom-left-radius: 5px;
        }

        .typing-dots::after {
            content: '';
            animation: dots 1.5s infinite;
        }

        @keyframes dots {
            0%, 20% { content: ''; }
            40% { content: '.'; }
            60% { content: '..'; }
            80%, 100% { content: '...'; }
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    </style>
</head>
<body>
    <div class="chat-container">
        <div class="chat-header">
            Simple AI
        </div>
        
        <div class="status-bar">
            stttttt (Key: agrihack)
        </div>

        <div class="help-text">
            "you can try with formula +"
        </div>

        <div class="chat-messages" id="chatMessages">
            <div class="message ai-message">
                Hello! I'm your Simple Secure AI. Try typing math equations like "1+1" to see encoded responses!
            </div>
        </div>

        <div class="typing-indicator" id="typingIndicator">
            <span class="typing-dots">AI processing</span>
        </div>

        <div class="chat-input">
            <input type="text" class="input-field" id="messageInput" placeholder="Try: 1+1 for encoded response..." maxlength="200">
            <button class="send-button" id="sendButton">Send</button>
        </div>
    </div>

    <script>
        class SimpleSecureAI {
            constructor() {
                this.patterns = {
                    math: /(\\d+)\\s*([\\+\\-\\*\\/])\\s*(\\d+)/,
                    greeting: /\\b(hi|hello|hey|good morning)\\b/i,
                    thanks: /\\b(thank you|thanks)\\b/i
                };
            }

            async doMath(expression) {
                const match = expression.match(this.patterns.math);
                if (!match) return null;

                const num1 = parseFloat(match[1]);
                const operator = match[2];
                const num2 = parseFloat(match[3]);
                
                let result;
                switch (operator) {
                    case '+': result = num1 + num2; break;
                    case '-': result = num1 - num2; break;
                    case '*': result = num1 * num2; break;
                    case '/': result = num2 !== 0 ? num1 / num2 : null; break;
                    default: return null;
                }

                if (result === null) {
                    return { text: "Cannot divide by zero!", type: 'error' };
                }

                try {
                    const response = await fetch('/api/encode-math', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ num1, operator, num2, result })
                    });

                    const data = await response.json();
                    return { text: data.encoded, type: 'encoded' };
                    
                } catch (error) {
                    return { text: num1 + ' ' + operator + ' ' + num2 + ' = ' + result, type: 'normal' };
                }
            }

            async generateResponse(userInput) {
                const input = userInput.toLowerCase().trim();

                const mathResult = await this.doMath(userInput);
                if (mathResult) return mathResult;

                if (this.patterns.greeting.test(input)) {
                    return { text: "Hello! Ready to encode some math problems!", type: 'normal' };
                }

                if (this.patterns.thanks.test(input)) {
                    return { text: "You're welcome! Try some math equations!", type: 'normal' };
                }

                // Default response
                const responses = [
                    "this just a easy",
                    "typing something",
                    "just a meminta aja kok",
                    "alahmak kamu jago"
                ];

                return { text: responses[Math.floor(Math.random() * responses.length)], type: 'normal' };
            }
        }

        // Initialize AI
        const ai = new SimpleSecureAI();
        const chatMessages = document.getElementById('chatMessages');
        const messageInput = document.getElementById('messageInput');
        const sendButton = document.getElementById('sendButton');
        const typingIndicator = document.getElementById('typingIndicator');

        function addMessage(content, isUser = false, messageType = 'normal') {
            const messageDiv = document.createElement('div');
            let className = 'message ';
            
            if (isUser) {
                className += 'user-message';
            } else {
                switch(messageType) {
                    case 'encoded':
                        className += 'encoded-message';
                        break;
                    default:
                        className += 'ai-message';
                }
            }
            
            messageDiv.className = className;
            messageDiv.textContent = content;
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function showTypingIndicator() {
            typingIndicator.style.display = 'block';
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function hideTypingIndicator() {
            typingIndicator.style.display = 'none';
        }

        async function sendMessage() {
            const message = messageInput.value.trim();
            if (!message) return;

            sendButton.disabled = true;
            addMessage(message, true);
            messageInput.value = '';

            showTypingIndicator();
            
            // Simulate processing time
            await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));

            const response = await ai.generateResponse(message);
            hideTypingIndicator();
            addMessage(response.text, false, response.type);
            
            sendButton.disabled = false;
            messageInput.focus();
        }

        // Event listeners
        sendButton.addEventListener('click', sendMessage);
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !sendButton.disabled) {
                sendMessage();
            }
        });

        messageInput.focus();
    </script>
</body>
</html>
    `);
});

// mulai deh servernya
app.listen(PORT, '0.0.0.0', () => {
    console.log('🚀 Simple Secure AI running on:');
    console.log('   Local:   http://localhost:' + PORT);
    console.log('   Network: http://0.0.0.0:' + PORT);
    console.log('');
});
