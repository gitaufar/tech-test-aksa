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
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const [formData, setFormData] = useState({
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
  const [addSuccess, setAddSuccess] = useState(false);
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  const addItem = (e) => {
    e.preventDefault();
    setIsOpen(true);
  }

  const resetForm = () => {
    setFormData({
      userId: user.id,
      name: "",
      description: "",
      location: "",
      date: "",
      contact: ""
    });
  }

  useEffect(() => {
    setBarangHilang(getPaginatedItems(getLostItems, page));
    setSearchParams({ page });
  }, [page, isEdit]);

  useEffect(() => {
    setAllItem(getLostItems());
    setBarangHilang(getPaginatedItems(getLostItems, page));
  }, [isOpen, isDelete]);

  const submitForm = (e) => {
    e.stopPropagation();
    e.preventDefault();
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
    <main className='flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 pt-28 px-4 gap-4 items-center'>
      <Form isOpen={isOpen} formData={formData} setFormData={setFormData} handleSubmit={submitForm} />
      <Form isOpen={isEdit} formData={formData} setFormData={setFormData} handleSubmit={(e) => editForm(e, index)} />
      <input
        type='text'
        placeholder='Search'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='bg-white dark:bg-gray-800 p-4 rounded shadow-md w-full max-w-md dark:text-white'
      />
      <div className='w-full'>
        <button onClick={addItem} className='bg-blue-500 text-white px-4 py-2 rounded cursor-pointer'>Add Lost Item</button>
      </div>
      <table className="table-auto border border-gray-300 bg-white w-full">
        <thead>
          <tr className="bg-gray-200">
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
                  <div className='flex gap-4 justify-center'>
                    <button
                      className="bg-blue-500 text-white rounded p-2 cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        setFormData(item);
                        setIndex(index);
                        setIsEdit(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white p-2 rounded cursor-pointer"
                      onClick={() => setIsDelete(true)}
                    >
                      Delete
                    </button>
                  </div>
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
    </main>
  )
}
