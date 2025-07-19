import { useEffect, useState } from 'react'
import Form from './components/common/Form'
import { useUser } from './context/UserContext'
import { addLostItem, getLostItems, getPaginatedItems, updateLostItem, deleteLostItem, searchLostItem } from './utils/itemsStorage';
import { useSearchParams } from 'react-router-dom';
import Modal from './components/common/Modal';

export default function App() {
  const { user } = useUser();
  const [barangHilang, setBarangHilang] = useState(getPaginatedItems(getLostItems));
  const [allItem, setAllItem] = useState(getLostItems());
  const [index, setIndex] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const [formData, setFormData] = useState({
    id: allItem.length + 1,
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
    setAllItem(getLostItems());
    if (search.trim() !== "") {
      const keyword = search.trim().toLowerCase();
      const results = searchLostItem(keyword);
      setBarangHilang(getPaginatedItems(() => results, page, 5));
      return;
    }
    setBarangHilang(getPaginatedItems(getLostItems, page));
  }, [isOpen, isDelete]);

  useEffect(() => {
    setSearchParams({ search, page });
    const keyword = search.trim().toLowerCase();
    if (keyword === "") {
      const all = getLostItems();
      setAllItem(all);
      setBarangHilang(getPaginatedItems(() => all, page));
    } else {
      const results = searchLostItem(keyword);
      setAllItem(results);
      setBarangHilang(getPaginatedItems(() => results, page, 5));
    }
  }, [search, page]);

  const addItem = (e) => {
    e.preventDefault();
    setIsOpen(true);
  }

  const resetForm = () => {
    setFormData({
      id: allItem.length + 1,
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
      setBarangHilang(getPaginatedItems(getLostItems, page));
      setSearchParams({ page });
    } else {
      setBarangHilang(getPaginatedItems(() => searchLostItem(search), page, 5));
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
    <main className='flex flex-col min-h-screen justify-center pb-8 bg-gray-100 dark:bg-gray-900 pt-28 px-4 gap-6 items-center'>
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
        placeholder='Search'
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
      <table className="table-auto border bg-white w-full dark:bg-black dark:text-white">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-800">
            <th className="border px-4 py-2">No.</th>
            <th className="border px-4 py-2">Nama</th>
            <th className="border px-4 py-2">Deskripsi</th>
            <th className="border px-4 py-2">Lokasi</th>
            <th className="border px-4 py-2">Tanggal</th>
            <th className="border px-4 py-2">Kontak</th>
            <th className="border px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {barangHilang.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center p-4">Tidak ada data barang hilang.</td>
            </tr>
          ) : (
            barangHilang.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.description}</td>
                <td className="border px-4 py-2">{item.location}</td>
                <td className="border px-4 py-2">{item.date}</td>
                <td className="border px-4 py-2">{item.contact}</td>
                <td className="border py-2">
                  {user.id === item.userId ? (
                    <div className='flex gap-4 justify-center'>
                      <button
                        className="bg-blue-500 text-white rounded p-2 cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          setFormData(item);
                          setIndex(item.id);
                          setIsEdit(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white p-2 rounded cursor-pointer"
                        onClick={() => {
                          setIndex(item.id);
                          setIsDelete(true);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  ) : (
                    <div className='flex gap-4 justify-center'>
                      <a
                        href={`https://wa.me/${item.contact}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-yellow-500 text-white p-2 rounded cursor-pointer inline-block text-center"
                      >
                        Lapor
                      </a>
                    </div>
                  )}

                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className='flex gap-4'>
        <button onClick={() => setPage(page - 1)} disabled={page <= 1} className='disabled:opacity-50 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer'>Previous</button>
        <input
          type='number'
          value={page}
          onChange={(e) => {
            let value = parseInt(e.target.value)
            if (value > Math.ceil(allItem.length / 5)) {
              setPage(Math.ceil(allItem.length / 5))
            } else {
              setPage(parseInt(e.target.value))
            }
          }}
          className='bg-white dark:bg-gray-800 p-4 rounded flex justify-center dark:text-white'
          max={Math.ceil(allItem.length / 5)}
          min={1}
        />
        <button onClick={() => setPage(page + 1)} disabled={page >= Math.ceil(allItem.length / 5)} className='disabled:opacity-50 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer'>Next</button>
      </div>
      <Modal isOpen={isDelete} onClose={() => setIsDelete(false)} title="Are you sure?" children={
        <div className='flex gap-4'>
          <button onClick={() => deleteData(index)} className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer">Delete</button>
          <button onClick={() => setIsDelete(false)} className="dark:bg-gray-700 bg-gray-200 dark:text-white px-4 py-2 rounded cursor-pointer ">Cancel</button>
        </div>
      } />
      <Modal isOpen={addSuccess} onClose={() => setAddSuccess(false)} title="Item added" children={<p className='text-center'>Item added successfully</p>} />
      <Modal isOpen={warning} onClose={() => setWarning(false)} title="Warning" children={<p className='text-center'>Please fill all the fields</p>} />
    </main>
  )
}
