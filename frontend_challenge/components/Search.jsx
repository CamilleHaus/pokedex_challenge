"use client";

import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import { useEffect, useRef, useState } from "react";
import { Input } from 'antd';
import { Button, Modal } from 'antd';

const Search = ({ search }) => {
  const router = useRouter();

  const initalRender = useRef(true);
  const [text, setText] = useState(search);

  const [query] = useDebounce(text, 750);

  useEffect(() => {
    if (initalRender.current) {
      initalRender.current = false;

      return;
    }

    if (!query) {
      router.push("/");
    } else {
      router.push(`?search=${query}`);
    }
  }, [query]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex justify-center w-full mb-5">
      <Button onClick={showModal}>
        Filtrar
      </Button>
      <Modal
        title="Qual Pokemon você está procurando hoje?"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
      <Input
        placeholder="ex: Pikachu"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="block w-4/5 rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
        placeholder:text-gray-400 focus:ring-2 focus:outline-red-700 sm:text-sm sm:leading-6 mb-10"
      />
      </Modal>
    </div>
  );
};

export default Search;
