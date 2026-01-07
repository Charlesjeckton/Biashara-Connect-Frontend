document.addEventListener('DOMContentLoaded', function() {
    console.log('Messages Page loaded');

    // Sample conversations data
    const conversations = [
        {
            id: 1,
            userId: "SK",
            userName: "Sarah Kamau",
            listingTitle: "iPhone 13 Pro 256GB",
            lastMessage: "Is this still available?",
            timestamp: "10:30 AM",
            unread: 3,
            isOnline: true
        },
        {
            id: 2,
            userId: "JM",
            userName: "John Mwangi",
            listingTitle: "Toyota Premio 2015",
            lastMessage: "Can I come for viewing tomorrow?",
            timestamp: "Yesterday",
            unread: 0,
            isOnline: false
        },
        {
            id: 3,
            userId: "FN",
            userName: "Furniture Nairobi",
            listingTitle: "Modern Sofa Set",
            lastMessage: "The price is negotiable",
            timestamp: "2 days ago",
            unread: 1,
            isOnline: true
        },
        {
            id: 4,
            userId: "PP",
            userName: "Pro Plumbers",
            listingTitle: "Plumbing Services",
            lastMessage: "We're available next Monday",
            timestamp: "3 days ago",
            unread: 0,
            isOnline: false
        },
        {
            id: 5,
            userId: "FW",
            userName: "Farm Warehouse",
            listingTitle: "Farm Tractor",
            lastMessage: "What's your best price?",
            timestamp: "1 week ago",
            unread: 0,
            isOnline: false
        }
    ];

    // Sample messages data
    const messages = {
        1: [
            { id: 1, sender: "them", text: "Hello! Is the iPhone 13 Pro still available?", timestamp: "10:00 AM" },
            { id: 2, sender: "me", text: "Yes, it's still available. Are you interested?", timestamp: "10:05 AM" },
            { id: 3, sender: "them", text: "Yes, what's your best price?", timestamp: "10:15 AM" },
            { id: 4, sender: "me", text: "I can do KSh 80,000 if you pick up today.", timestamp: "10:20 AM" },
            { id: 5, sender: "them", text: "That sounds good. Can I come see it?", timestamp: "10:30 AM" }
        ],
        2: [
            { id: 1, sender: "them", text: "Hi, is the Toyota Premio available for viewing?", timestamp: "Yesterday 2:00 PM" },
            { id: 2, sender: "me", text: "Yes, it's available. When would you like to see it?", timestamp: "Yesterday 2:15 PM" }
        ]
    };

    // DOM Elements
    const conversationsList = document.getElementById('conversationsList');
    const chatHeader = document.getElementById('chatHeader');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const messageInput = document.getElementById('messageInput');
    const sendMessageBtn = document.getElementById('sendMessage');
    const searchInput = document.querySelector('.conversations-search input');

    let currentConversationId = null;

    // Initialize
    renderConversations(conversations);

    // Functions
    function renderConversations(conversationsArray) {
        conversationsList.innerHTML = '';

        conversationsArray.forEach(conversation => {
            const conversationItem = document.createElement('div');
            conversationItem.className = `conversation-item ${conversation.unread > 0 ? 'unread' : ''}`;
            conversationItem.setAttribute('data-id', conversation.id);

            conversationItem.innerHTML = `
                <div class="conversation-avatar">
                    <div class="avatar">${conversation.userId}</div>
                    ${conversation.isOnline ? '<span class="online-status"></span>' : ''}
                </div>
                <div class="conversation-content">
                    <div class="conversation-header">
                        <h6 class="conversation-name">${conversation.userName}</h6>
                        <span class="conversation-time">${conversation.timestamp}</span>
                    </div>
                    <p class="conversation-preview">${conversation.listingTitle}</p>
                    <p class="conversation-last-msg">${conversation.lastMessage}</p>
                </div>
                ${conversation.unread > 0 ? `<span class="unread-badge">${conversation.unread}</span>` : ''}
            `;

            conversationsList.appendChild(conversationItem);
        });

        attachConversationListeners();
    }

    function openConversation(conversationId) {
        currentConversationId = conversationId;
        const conversation = conversations.find(c => c.id === conversationId);

        if (!conversation) return;

        // Update chat header
        chatHeader.querySelector('.user-avatar').textContent = conversation.userId;
        chatHeader.querySelector('.user-name').textContent = conversation.userName;
        chatHeader.querySelector('.user-status').innerHTML = `
            ${conversation.isOnline ? '<span class="text-success"><i class="fas fa-circle"></i> Online</span>' : 'Last seen recently'} | ${conversation.listingTitle}
        `;

        // Show chat input
        chatInput.style.display = 'block';

        // Load messages
        renderMessages(conversationId);

        // Mark as read
        markAsRead(conversationId);

        // Highlight active conversation
        document.querySelectorAll('.conversation-item').forEach(item => {
            item.classList.remove('active');
            if (parseInt(item.getAttribute('data-id')) === conversationId) {
                item.classList.add('active');
            }
        });
    }

    function renderMessages(conversationId) {
        const conversationMessages = messages[conversationId] || [];
        chatMessages.innerHTML = '';

        if (conversationMessages.length === 0) {
            chatMessages.innerHTML = `
                <div class="empty-conversation">
                    <i class="fas fa-comment-dots"></i>
                    <h5>Start a conversation</h5>
                    <p>Send a message to begin chatting about the listing</p>
                </div>
            `;
            return;
        }

        conversationMessages.forEach(msg => {
            const messageElement = document.createElement('div');
            messageElement.className = `message ${msg.sender === 'me' ? 'sent' : 'received'}`;
            messageElement.innerHTML = `
                <div class="message-content">
                    <div class="message-text">${msg.text}</div>
                    <div class="message-time">${msg.timestamp}</div>
                </div>
            `;
            chatMessages.appendChild(messageElement);
        });

        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function markAsRead(conversationId) {
        const conversation = conversations.find(c => c.id === conversationId);
        if (conversation && conversation.unread > 0) {
            conversation.unread = 0;
            renderConversations(conversations);

            // Update badge in navigation
            updateMessageBadge();
        }
    }

    function updateMessageBadge() {
        const totalUnread = conversations.reduce((sum, conv) => sum + conv.unread, 0);
        const badge = document.querySelector('.nav-item .badge');
        if (badge) {
            if (totalUnread > 0) {
                badge.textContent = totalUnread;
                badge.style.display = 'inline-block';
            } else {
                badge.style.display = 'none';
            }
        }
    }

    function sendMessage() {
        const text = messageInput.value.trim();
        if (!text || !currentConversationId) return;

        // Add message to data
        if (!messages[currentConversationId]) {
            messages[currentConversationId] = [];
        }

        const newMessage = {
            id: messages[currentConversationId].length + 1,
            sender: 'me',
            text: text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        messages[currentConversationId].push(newMessage);
        messageInput.value = '';

        // Update UI
        renderMessages(currentConversationId);

        // Update conversation last message
        const conversation = conversations.find(c => c.id === currentConversationId);
        if (conversation) {
            conversation.lastMessage = text;
            conversation.timestamp = 'Just now';
            conversation.unread = 0;
            renderConversations(conversations);
        }
    }

    function searchConversations(query) {
        const filtered = conversations.filter(conv =>
            conv.userName.toLowerCase().includes(query.toLowerCase()) ||
            conv.listingTitle.toLowerCase().includes(query.toLowerCase()) ||
            conv.lastMessage.toLowerCase().includes(query.toLowerCase())
        );
        renderConversations(filtered);
    }

    function attachConversationListeners() {
        document.querySelectorAll('.conversation-item').forEach(item => {
            item.addEventListener('click', function() {
                const conversationId = parseInt(this.getAttribute('data-id'));
                openConversation(conversationId);
            });
        });
    }

    // Event Listeners
    sendMessageBtn.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    searchInput.addEventListener('input', function() {
        searchConversations(this.value);
    });

    // Simulate receiving new messages
    setInterval(() => {
        // Randomly add messages to simulate real-time
        if (Math.random() > 0.8 && conversations.length > 0) {
            const randomConv = conversations[Math.floor(Math.random() * conversations.length)];
            if (randomConv.id !== currentConversationId) {
                randomConv.unread++;
                randomConv.timestamp = 'Just now';
                renderConversations(conversations);
                updateMessageBadge();
            }
        }
    }, 30000); // Every 30 seconds

    // Initialize message badge
    updateMessageBadge();
});