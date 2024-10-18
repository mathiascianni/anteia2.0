import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { firestore, auth, getUserById, sendNotification } from '../credentials';
import { collection, addDoc, doc, getDoc, setDoc, onSnapshot, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getMessaging, onMessage } from "firebase/messaging";

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
    
        const fetchChatData = async () => {
            try {
                let chatRef = doc(firestore, 'chats', `${currentUser.uid}_${recipient.id}`);
                let chatDoc = await getDoc(chatRef); 
                console.log(chatDoc.id);
    
                if (!chatDoc.exists()) {
                    chatRef = doc(firestore, 'chats', `${recipient.id}_${currentUser.uid}`);
                    chatDoc = await getDoc(chatRef);
                    console.log(chatDoc.id);
                }
    
                let chatId = chatDoc.id; 
    
                setChatId(chatId);
    
                return onSnapshot(
                    query(collection(chatRef, 'messages'), orderBy('timestamp', 'asc')),
                    snapshot => setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
                );
            } catch (error) {
                console.error("Error fetching chat data:", error);
            }
        };
    
        fetchChatData(); 
    
    }, [currentUser, recipient]);
    

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        const messaging = getMessaging();
        const unsubscribe = onMessage(messaging, (payload) => {
            console.log('Notificación recibida:', payload);
        });

        return () => unsubscribe();
    }, []);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (newMessage.trim() === '' || !chatId || !currentUser) return;

        try {
            const messageRef = await addDoc(collection(doc(firestore, 'chats', chatId), 'messages'), {
                text: newMessage,
                sender: currentUser.uid,
                timestamp: serverTimestamp(),
                view:false
            });
            await sendNotification(newMessage, currentUser.uid, userId)
            setNewMessage('');
        } catch (error) {
            console.error('Error al enviar el mensaje:', error);
        }
    };
    return (
        <div className="mx-auto border border-gray-200 flex flex-col">
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

                        {message.sender === userId && (
                            <img src={recipient.photoURL} alt={recipient.displayName} className="w-6 h-6 rounded-full inline-block mr-2" />
                        )}
                        <div className={`inline-block max-w-xs p-3 rounded-lg ${message.sender !== userId ? 'bg-primary-light' : 'bg-white'}`}>
                            <p>{message.text}</p>
                        </div>
                        {message.sender !== userId && (
                            <img src={currentUser.photoURL} alt={currentUser.displayName} className="w-6 h-6 rounded-full inline-block ml-2" />
                        )}
                        <span className="text-sm ml-2 text-gray-500 block mt-1">
                            {message.timestamp ? new Date(message.timestamp.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Enviando...'}
                        </span>
                    </div>
                )) : <p className="text-center text-gray-500">No hay mensajes aún.</p>}
                <div ref={messagesEndRef} />
            </div>
            <div className="bg-gray-200 p-4">
                <form onSubmit={sendMessage} className="flex">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Escribe un mensaje..."
                        className="flex-grow px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </form>
            </div>
        </div>
    );
};

export default Chat;
