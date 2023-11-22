import { useState } from 'react';
import { IMessage } from '../App';

interface NewMessageProps {
  create: (form: IMessage) => void,
}

const userId = localStorage.getItem('userId') as string;

export const NewMessage = ({ create }: NewMessageProps) => {
  const [form, setForm] = useState<IMessage>({
    id: 0,
    userId: userId,
    content: '',
  });
  const { content } = form;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('form = ', form)
    create(form);
    setForm(prevForm => ({
      ...prevForm,
      content: '',
    }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    const { value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      content: value,
    }))
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <input value={content} type='text' name='content' onChange={handleChange} />
        <button type="submit" className="material-icons">navigation</button>
      </form>
    </>
  )
}
