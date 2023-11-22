import { IMessage } from "../App"

interface ChatProps {
  messages: IMessage[],
  userId: string,
}

export const Chat = ({ messages, userId }: ChatProps) => {
  for (let i = 0; i < messages.length; i += 1) {
    const isMine = messages[i].userId === userId ? 'mine' : 'notMine';
    messages[i].isMine = isMine;
  }

  return (
    <div className="chat">
      {messages.map((message) => <div key={crypto.randomUUID()} className={`message ${message.isMine}`}>
        <span>{message.content}</span>
      </div>)}
    </div>
  )
}
