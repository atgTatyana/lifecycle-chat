import './App.css'
import { Chat } from './components/Chat'
import { NewMessage } from './components/NewMessage'
import { useState, useEffect } from 'react';

export interface IMessage {
  id: number,
  userId: string,
  content: string,
  isMine?: string,
}

const url =  'http://localhost:7070/messages';

const user = localStorage.getItem('userId');
const userId: string = user ? user : crypto.randomUUID();
if (!user) {
  localStorage.setItem('userId', userId);
}  

function App() {
  const [ messages, setMessages ] = useState<IMessage[]>([]);
  const [ updated, setUpdated ] = useState(0);
  const [ lastId, setLastId ] = useState<number>(0);

  // id — идентификатор последнего полученного сообщения при первоначальной загрузке — 0
  const fetchGet = () => {
    console.log(lastId)
    fetch(url + `?from=${lastId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ответ сети был не ok");
        }
        return response.json()
      .then((data: IMessage[]) => {

          setMessages([...messages, ...data]);

          setUpdated(new Date().getTime());
          if (data.length) {
            console.log('data length', data.length)
            setLastId(data[data.length - 1].id);
            scrollHeight();
          }
        })
      });
  }

  // прокрутка в конец чата
  const chatMessages = document.querySelector('.chat');
  const chatArea = document.querySelector('.chat-area');
  function scrollHeight() {
    if (chatMessages && chatArea) {
      const {height} = chatMessages.getBoundingClientRect();
      chatArea.scrollTop = height;
    }
  }

  useEffect(fetchGet, []);

  useEffect(() => {
    const timeout = setTimeout(fetchGet, 1000);
    return () => {
      clearTimeout(timeout);
    }
  }, [updated]);

  const handleCreate = (form: IMessage) => {
    (async () => {
      await fetch(url, {
        method: 'POST',
        body: JSON.stringify(form),
      })
    })();
  }

  return (
    <div className='container'>
      <h2>Anonymous Chat</h2>
      <div className='chat-area'>
        <Chat messages={messages} userId={userId} />
      </div>
      <div className='new-message'>
        <NewMessage create={handleCreate}/>
      </div>
    </div>
  )
}

export default App
