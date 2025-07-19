import { useEffect, useState } from 'react'
import Form from './components/common/Form'
import { useUser } from './context/UserContext'
import { addLostItem, getLostItems, getPaginatedItems, updateLostItem, deleteLostItem, searchLostItem } from './utils/itemsStorage';
import { useSearchParams } from 'react-router-dom';
import Modal from './components/common/Modal';
import Table from './components/common/Table';
import Card from './components/common/Card';
import { MdNavigateNext } from "react-icons/md";

export default function App() {
  const { user } = useUser();
  const [lostItems, setLostItems] = useState(getPaginatedItems(getLostItems));
  const [allItems, setAllItems] = useState(getLostItems());
  const [index, setIndex] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const [formData, setFormData] = useState({
    id: allItems.length + 1,
    userId: user.id,
    name: "",
    description: "",
    location: "",
    date: "",
    contact: ""
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [warning, setWarning] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [search, setSearch] = useState(searchParams.get("search") || "");

    useEffect(() => {
      setAllItems(getLostItems());
      if (search.trim() !== "") {
        const keyword = search.trim().toLowerCase();
        const results = searchLostItem(keyword);
        setLostItems(getPaginatedItems(() => results, page));
        return;
      }
      setLostItems(getPaginatedItems(getLostItems, page));
    }, [isOpen, isDelete]);

    useEffect(() => {
      setSearchParams({ search, page });
      const keyword = search.trim().toLowerCase();
      if (keyword === "") {
        const all = getLostItems();
        setAllItems(all);
        setLostItems(getPaginatedItems(() => all, page));
      } else {
        const results = searchLostItem(keyword);
        setAllItems(results);
        setLostItems(getPaginatedItems(() => results, page));
      }
    }, [search, page]);

    const addItem = (e) => {
      e.preventDefault();
      setIsOpen(true);
    }

    const resetForm = () => {
      setFormData({
        id: allItems.length + 1,
        userId: user.id,
        name: "",
        description: "",
        location: "",
        date: "",
        contact: ""
      });
    }

    useEffect(() => {
      if (search.trim() === "") {
        setLostItems(getPaginatedItems(getLostItems, page));
        setSearchParams({ page });
      } else {
        setLostItems(getPaginatedItems(() => searchLostItem(search), page));
        setSearchParams({ search, page });
      }
    }, [page, isEdit]);

    const submitForm = (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (formData.name === "" || formData.description === "" || formData.location === "" || formData.date === "" || formData.contact === "") {
        setWarning(true);
        return;
      }
      addLostItem(formData);
      setIsOpen(false);
      setAddSuccess(true);
      resetForm();
    }

    const editForm = (e, index) => {
      e.stopPropagation();
      e.preventDefault();
      updateLostItem(index, formData);
      setIsEdit(false);
      resetForm();
    }

    const deleteData = (index) => {
      deleteLostItem(index);
      setIsDelete(false);
    }

    return (
      <main className='flex flex-col min-h-screen md:justify-center lg:justify-start pb-8 bg-gray-100 dark:bg-gray-900 pt-16 md:pt-28 px-4 gap-6 items-center overflow-hidden'>
        <Form isOpen={isOpen} onClose={() => {
          setIsOpen(false)
          resetForm()
        }} formData={formData} setFormData={setFormData} handleSubmit={submitForm} />
        <Form isOpen={isEdit} onClose={() => {
          setIsEdit(false)
          resetForm()
        }} formData={formData} setFormData={setFormData} handleSubmit={(e) => editForm(e, index)} />
        <input
          type='text'
          placeholder='Search...'
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1);
          }}
          className='bg-white dark:bg-gray-800 p-4 rounded shadow-md w-full max-w-md dark:text-white'
        />
        <div className='w-full'>
          <button onClick={addItem} className='bg-blue-500 text-white px-4 py-2 rounded cursor-pointer'>Add Lost Item</button>
        </div>
        <Table
          lostItems={lostItems}
          page={page}
          allItemsLength={allItems.length}
          user={user}
          setPage={setPage}
          setFormData={setFormData}
          setIndex={setIndex}
          setIsEdit={setIsEdit}
          setIsDelete={setIsDelete}
        />
        <Card
          lostItems={lostItems}
          user={user}
          setFormData={setFormData}
          setIndex={setIndex}
          setIsEdit={setIsEdit}
          setIsDelete={setIsDelete}
        />
        <div className='flex gap-4 md:hidden'>
          <button onClick={() => setPage(page - 1)} disabled={page <= 1} className='disabled:opacity-50 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer'>
            <MdNavigateNext className='rotate-180' />
          </button>
          <input
            type='number'
            value={page}
            onChange={(e) => {
              let value = parseInt(e.target.value)
              if (value > Math.ceil(allItems.length / 5)) {
                setPage(Math.ceil(allItems.length / 5))
              } else {
                setPage(parseInt(e.target.value))
              }
            }}
            className='bg-white dark:bg-gray-800 p-4 rounded flex justify-center dark:text-white'
            max={Math.ceil(allItems.length / 5)}
            min={1}
          />
          <button onClick={() => setPage(page + 1)} disabled={page >= Math.ceil(allItems.length / 5)} className='disabled:opacity-50 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer'>
            <MdNavigateNext />
          </button>
        </div>
        <Modal isOpen={isDelete} onClose={() => setIsDelete(false)} title="Are you sure?" children={
          <div className='flex gap-4'>
            <button onClick={() => deleteData(index)} className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer">Delete</button>
            <button onClick={() => setIsDelete(false)} className="dark:bg-gray-700 bg-gray-200 dark:text-white px-4 py-2 rounded cursor-pointer">Cancel</button>
          </div>
        } />
        <Modal isOpen={addSuccess} onClose={() => setAddSuccess(false)} title="Item Added" children={<p className='text-center'>Item added successfully</p>} />
        <Modal isOpen={warning} onClose={() => setWarning(false)} title="Warning" children={<p className='text-center'>Please fill in all fields</p>} />
      </main>
    )
  }
