import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { firestore, auth, getUserById } from '../credentials';
import { collection, addDoc, doc, getDoc, setDoc, onSnapshot, serverTimestamp, query, orderBy } from 'firebase/firestore';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [chatId, setChatId] = useState(null);
    const [recipient, setRecipient] = useState(null);
    const messagesEndRef = useRef(null);
    const { userId } = useParams();
    const currentUser = auth.currentUser;

    useEffect(() => {
        if (!userId) return;
        getUserById(userId).then(setRecipient).catch(console.error);
    }, [userId]);

    useEffect(() => {
        if (!currentUser || !recipient) return;

        const chatId = [currentUser.uid, recipient.id].sort().join('_');
        const chatRef = doc(firestore, 'chats', chatId);

        getDoc(chatRef).then(chatDoc => {
            if (!chatDoc.exists()) {
                setDoc(chatRef, { participants: [currentUser.uid, recipient.id], createdAt: serverTimestamp() });
            }
            setChatId(chatId);

            return onSnapshot(
                query(collection(chatRef, 'messages'), orderBy('timestamp', 'asc')),
                snapshot => setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
            );
        }).catch(console.error);
    }, [currentUser, recipient]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (newMessage.trim() === '' || !chatId || !currentUser) return;

        try {
            await addDoc(collection(doc(firestore, 'chats', chatId), 'messages'), {
                text: newMessage,
                sender: currentUser.uid,
                timestamp: serverTimestamp()
            });
            setNewMessage('');
        } catch (error) {
            console.error('Error al enviar el mensaje:', error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto border border-gray-200 rounded-lg overflow-hidden shadow-lg h-[600px] flex flex-col">
            <div className="bg-primary text-white p-4 flex items-center">
                {recipient ? (
                    <>
                        <img src={recipient.photoURL || 'https://via.placeholder.com/50'} alt={recipient.displayName} className="w-10 h-10 rounded-full mr-3" />
                        <h2 className="text-xl font-semibold">{recipient.displayName || recipient.email}</h2>
                    </>
                ) : (
                    <h2 className="text-xl font-semibold">Cargando...</h2>
                )}
            </div>
            <div className="flex-grow overflow-y-auto p-4 bg-gray-100">
                {messages.length > 0 ? messages.map((message) => (
                    <div key={message.id} className={`mb-4 ${message.sender !== userId ? 'text-right' : 'text-left'}`}>
                        <div className={`inline-block max-w-xs p-3 rounded-lg ${message.sender !== userId ? 'bg-primary-light' : 'bg-white'}`}>
                            <p>{message.text}</p>
                            <span className="text-xs text-gray-500">
                                {message.timestamp ? new Date(message.timestamp.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Enviando...'}
                            </span>
                        </div>
                    </div>
                )) : <p className="text-center text-gray-500">No hay mensajes aún.</p>}
                <div ref={messagesEndRef} />
            </div>
            <div className="sticky bottom-0 bg-gray-200 p-4">
                <form onSubmit={sendMessage} className="flex">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Escribe un mensaje..."
                        className="flex-grow px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button type="submit" className="ml-2 px-6 py-2 bg-primary text-white rounded-full hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                        Enviar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chat;
