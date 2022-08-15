import { useReducer } from 'react';
import { useQuery } from 'react-query';
import Form from './Form';
import Note from './Note';
import { useNavigate } from 'react-router-dom';

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

export default function Home() {
  const [{ sort, filter }, dispatch] = useReducer(reducer, {});

  const { data } = useQuery(['notes', sort, filter], fetchNotes(sort, filter));
  const { data: user,  } = useQuery('user');

  const redirect = useNavigate();
  console.log(user);

  if (!user) return null;
  if (!user.loggedIn) return redirect('/login');

  return (
    <div className='text-center'>
      <div className='mx-auto w-9/12'>
        <h1 className='mt-16 text-3xl'>Naomi's Notes</h1>
        <Form />
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
            <option value='none'>sort by none</option>
            <option value='createdAt'>sort by date</option>
            <option value='value'>sort by text</option>
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
          {!data ? null : data.length === 0 ? (
            <p className='mt-20'>empty</p>
          ) : (
            data.map((data, i) => <Note key={data.id} {...data} no={i + 1} />)
          )}
        </ul>
      </div>
    </div>
  );
}

const fetchNotes = (sort, filter) => async () => {
  const orderby = sort ? 'orderby=' + sort : '';
  const filterby = filter !== undefined ? '&filterby=' + filter : '';
  const response = await fetch('http://localhost:5000/api/notes?' + orderby + filterby);
  if (!response.ok) throw new Error('Something went wrong');
  return response.json();
};
