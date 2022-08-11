function Form({setDumbRender}) {
  const handleAddNote = async (e) => {
    e.preventDefault();
    const value = e.target[0].value;
    if (!value) return;
    await fetch('http://localhost:5000/api/notes', {
      method: 'POST',
      body: JSON.stringify({value}),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setDumbRender(p => !p);
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
