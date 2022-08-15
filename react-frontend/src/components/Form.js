import { useMutation } from 'react-query';
import { queryClient } from '../App';

function Form() {
  const mutation = useMutation((v) => createNote(v), {
    onSuccess: () => queryClient.invalidateQueries('notes'),
  });

  const handleAddNote = (e) => {
    e.preventDefault();
    const value = e.target[0].value;
    if (!value) return;
    mutation.mutate(value);
  };

  return (
    <form onSubmit={handleAddNote} className='mt-8 flex'>
      <input name='note' className='grow px-4' type='text' placeholder='add a note' />
      <button type='submit' className='bg-orange-600 px-6 py-1 text-white active:bg-orange-400'>
        add
      </button>
    </form>
  );
}

export default Form;

const createNote = async (value) => {
  const result = await fetch('http://localhost:5000/api/notes', {
    method: 'POST',
    body: JSON.stringify({ value }),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include'
  });
  if (!result.ok) throw new Error('operation failed');
  return result;
};
