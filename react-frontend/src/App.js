import { useState, useReducer, useEffect } from 'react';
import Form from './components/Form';
import Note from './components/Note';

const reducer = ({ sort, filter }, { type, value }) => {
  switch (type) {
    case 'none':
      return {};
    case 'sort':
      return { sort: value === 'none' ? undefined : value, filter };
    case 'filter':
      return { filter: filter === 1 ? 0 : 1, sort };
    default:
      return;
  }
};

export default function App() {
  const [notes, setNotes] = useState(null);
  const [dumbRender, setDumbRender] = useState(false);
  const [{ sort, filter }, dispatch] = useReducer(reducer, {});
  
  useEffect(() => {
    (async () => {
      try {
        const orderby = sort ? 'orderby=' + sort : '';
        const filterby = filter !== undefined ? '&filterby=' + filter : '';
        const raw = await fetch('http://localhost:5000/api/notes?' + orderby + filterby);
        const data = await raw.json();
        setNotes(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [dumbRender, filter, sort]);

  return (
    <div className='text-center'>
      <div className='mx-auto w-9/12'>
        <h1 className='mt-16 text-3xl'>Naomi's Notes</h1>
        <Form setDumbRender={setDumbRender} />
        <h2 className='mt-8 mb-2 text-left'>notes</h2>
        <div className='my-2 flex justify-end gap-2'>
          <button
            onClick={() => dispatch({ type: 'none' })}
            className={`rounded-md px-3 py-[1px] ${
              !sort && filter === undefined ? 'bg-orange-600 text-white' : ''
            }`}
          >
            none
          </button>
          <select
            defaultValue='sort by none'
            onChange={(e) => dispatch({ type: 'sort', value: e.target.value })}
          >
            <option value='createdAt'>sort by date</option>
            <option value='value'>sort by text</option>
            <option value='none'>none</option>
          </select>
          <button
            onClick={() => dispatch({ type: 'filter' })}
            className={`rounded-md py-[1px] px-2 ${
              filter !== undefined ? 'bg-orange-600 text-white' : ''
            }`}
          >
            filter by {filter ? 'incompleted' : 'completed'}
          </button>
        </div>
        <ul>
          {!notes ? null : notes.length === 0 ? (
            <p className='mt-20'>empty</p>
          ) : (
            notes.map((data, i) => (
              <Note setDumbRender={setDumbRender} key={data.id} {...data} no={i + 1} />
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
