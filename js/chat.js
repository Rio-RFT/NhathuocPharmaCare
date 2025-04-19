class AIChat {
    constructor() {
        this.apiKey = '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'; // OpenRouter API key
        this.model = 'meta-llama/llama-4-maverick:free';
        this.chatContainer = document.querySelector('.chat-container');
        this.messagesContainer = document.querySelector('.chat-messages');
        this.inputField = document.querySelector('.chat-input textarea');
        this.sendButton = document.querySelector('.chat-input button');
        this.toggleButton = document.querySelector('.chat-toggle-btn');
        this.minimizeButton = document.querySelector('.chat-minimize-btn');

        // Khởi tạo âm thanh
        this.welcomeSound = new Audio('voice/voice.mp3');
        this.notificationSound = new Audio('voice/notification.mp3');

        // Đảm bảo âm thanh được load sẵn
        this.welcomeSound.load();
        this.notificationSound.load();

        this.setupEventListeners();
        this.loadChatHistory();
    }

    setupEventListeners() {
        // Xử lý nút toggle chat
        this.toggleButton.addEventListener('click', () => {
            this.chatContainer.classList.toggle('active');
            if (this.chatContainer.classList.contains('active')) {
                this.inputField.focus();
                // Kiểm tra xem đã phát welcome sound chưa
                if (!sessionStorage.getItem('welcomeSoundPlayed')) {
                    this.welcomeSound.play()
                        .then(() => {
                            // Lưu trạng thái đã phát vào session
                            sessionStorage.setItem('welcomeSoundPlayed', 'true');
                        })
                        .catch(error => {
                            console.log('Không thể phát âm thanh:', error);
                        });
                }
            }
        });

        // Xử lý nút minimize
        this.minimizeButton.addEventListener('click', () => {
            this.chatContainer.classList.remove('active');
        });

        // Xử lý input
        this.inputField.addEventListener('input', () => {
            this.sendButton.disabled = !this.inputField.value.trim();
            this.adjustTextareaHeight();
        });

        // Xử lý phím Enter
        this.inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (!this.sendButton.disabled) {
                    this.sendMessage();
                }
            }
        });

        // Xử lý nút gửi
        this.sendButton.addEventListener('click', () => {
            if (!this.sendButton.disabled) {
                this.sendMessage();
            }
        });
    }

    adjustTextareaHeight() {
        this.inputField.style.height = 'auto';
        this.inputField.style.height = Math.min(this.inputField.scrollHeight, 100) + 'px';
    }

    async sendMessage() {
        const message = this.inputField.value.trim();
        if (!message) return;

        // Thêm tin nhắn người dùng vào chat
        this.addMessage(message, 'user');

        // Clear input và reset height
        this.inputField.value = '';
        this.inputField.style.height = 'auto';
        this.sendButton.disabled = true;

        // Hiển thị trạng thái đang gõ
        this.showTypingIndicator();

        try {
            const response = await this.getAIResponse(message);
            this.removeTypingIndicator();
            this.addMessage(response, 'ai');
        } catch (error) {
            this.removeTypingIndicator();
            this.addMessage('Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.', 'ai', true);
            console.error('Error:', error);
        }

        // Lưu lịch sử chat
        this.saveChatHistory();
    }

    async addMessage(content, sender, isError = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;

        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = content;

        const messageTime = document.createElement('div');
        messageTime.className = 'message-time';
        messageTime.textContent = new Date().toLocaleTimeString();

        messageDiv.appendChild(messageContent);
        messageDiv.appendChild(messageTime);

        if (isError) {
            messageContent.style.color = '#ff4444';
        }

        this.messagesContainer.appendChild(messageDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;

        // Phát âm thanh thông báo khi có tin nhắn mới từ AI
        if (sender === 'ai' && !isError) {
            this.notificationSound.play().catch(error => {
                console.log('Không thể phát âm thanh:', error);
            });
        }
    }

    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message ai-message typing-indicator';
        typingDiv.innerHTML = '<div class="message-content">AI đang trả lời...</div>';
        this.messagesContainer.appendChild(typingDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    removeTypingIndicator() {
        const typingIndicator = this.messagesContainer.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    async getAIResponse(message) {
        if (!this.apiKey) {
            throw new Error('API key is not set');
        }

        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`,
                'HTTP-Referer': window.location.origin,
                'X-Title': 'PharmaCare AI Chat'
            },
            body: JSON.stringify({
                model: this.model,
                messages: [
                    {
                        role: 'system',
                        content: `Bạn là trợ lý AI của PharmaCare - một nhà thuốc trực tuyến uy tín được cấp phép bởi Bộ Y tế. Nhiệm vụ của bạn là:

1. Tư vấn sức khỏe và thuốc:
- Giải đáp thắc mắc về các vấn đề sức khỏe thông thường
- Tư vấn về cách sử dụng thuốc, liều dùng và tác dụng phụ
- Hướng dẫn cách phòng bệnh và chăm sóc sức khỏe
- LUÔN nhắc nhở rằng bạn không phải là bác sĩ và khuyến khích khách hàng đến gặp bác sĩ khi cần

2. Tư vấn sản phẩm:
- Giới thiệu các sản phẩm phù hợp với nhu cầu của khách hàng
- Cung cấp thông tin chi tiết về thành phần, công dụng và cách dùng
- So sánh các sản phẩm tương tự để khách hàng lựa chọn
- Tư vấn về giá cả và chương trình khuyến mãi

3. Hỗ trợ mua hàng:
- Hướng dẫn cách đặt hàng trên website
- Giải đáp thắc mắc về thanh toán và giao hàng
- Hỗ trợ tra cứu đơn hàng và tình trạng giao hàng
- Xử lý các vấn đề về đổi/trả hàng

Nguyên tắc tư vấn:
- Luôn thân thiện, chuyên nghiệp và đồng cảm
- Cung cấp thông tin chính xác, khoa học và dễ hiểu
- Ưu tiên an toàn sức khỏe của khách hàng
- Không tư vấn về các bệnh nghiêm trọng cần điều trị chuyên khoa
- Không chẩn đoán bệnh hoặc kê đơn thuốc
- Không quảng cáo quá mức hoặc gây hiểu nhầm về sản phẩm

Khi trả lời:
- Sử dụng ngôn ngữ đơn giản, dễ hiểu
- Trả lời ngắn gọn nhưng đầy đủ thông tin
- Đưa ra các lựa chọn và giải pháp cụ thể
- Luôn nhấn mạnh tầm quan trọng của việc tham khảo ý kiến bác sĩ
- Khuyến khích khách hàng đặt thêm câu hỏi nếu cần`
                    },
                    {
                        role: 'user',
                        content: message
                    }
                ]
            })
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    saveChatHistory() {
        const messages = Array.from(this.messagesContainer.children).map(msg => ({
            content: msg.querySelector('.message-content').textContent,
            sender: msg.classList.contains('user-message') ? 'user' : 'ai',
            time: msg.querySelector('.message-time').textContent
        }));

        localStorage.setItem('chat_history', JSON.stringify(messages));
    }

    loadChatHistory() {
        const history = localStorage.getItem('chat_history');
        if (history) {
            const messages = JSON.parse(history);
            this.messagesContainer.innerHTML = '';

            messages.forEach(msg => {
                const messageDiv = document.createElement('div');
                messageDiv.className = `message ${msg.sender}-message`;

                const messageContent = document.createElement('div');
                messageContent.className = 'message-content';
                messageContent.textContent = msg.content;

                const messageTime = document.createElement('div');
                messageTime.className = 'message-time';
                messageTime.textContent = msg.time;

                messageDiv.appendChild(messageContent);
                messageDiv.appendChild(messageTime);

                this.messagesContainer.appendChild(messageDiv);
            });

            this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        }
    }

    setApiKey(key) {
        this.apiKey = key;
    }
}

// Khởi tạo chat khi trang đã load
document.addEventListener('DOMContentLoaded', () => {
    window.aiChat = new AIChat();
});