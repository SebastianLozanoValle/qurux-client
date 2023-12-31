import React, { useState, useEffect, useRef } from 'react';
import { RiArrowLeftCircleLine, RiArrowRightCircleLine } from "react-icons/ri";
import { tabs } from '../data/tabs';

export const Tabs = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const tabsBox = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const tabsRefs = tabs.reduce((acc, value, index) => {
    acc[index] = React.createRef();
    return acc;
  }, {});

  const handleIcons = (scrollVal) => {
    let maxScrollableWidth = tabsBox.current.scrollWidth - tabsBox.current.clientWidth;
    // Aquí puedes manejar la visibilidad de tus iconos de flecha
  }

  const dragging = (e) => {
    if(!isDragging) return;
    tabsBox.current.scrollLeft -= e.movementX;
    handleIcons(tabsBox.current.scrollLeft)
  }

  const dragStop = () => {
    setIsDragging(false);
  }

  const scrollTabs = (direction) => {
    const currentIndex = tabs.indexOf(activeTab);
    if (direction === 'left' && currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]);
    } else if (direction === 'right' && currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }
  }

  useEffect(() => {
    const box = tabsBox.current;
    box.addEventListener("mousedown", () => setIsDragging(true));
    box.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);

    return () => {
      box.removeEventListener("mousedown", () => setIsDragging(true));
      box.removeEventListener("mousemove", dragging);
      document.removeEventListener("mouseup", dragStop);
    }
  }, [isDragging]);

  useEffect(() => {
    tabsRefs[tabs.indexOf(activeTab)].current.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'nearest', 
      inline: 'center' 
    });
  }, [activeTab]);

  return (
    <>
      <div className="flex w-full rounded-xl bg-white relative top-[-40px] shadow-xl">
        <button className='p-4 text-6xl text-[#d3983f]' onClick={() => scrollTabs('left')}><RiArrowLeftCircleLine /></button>
        <div className="flex overflow-x-auto" ref={tabsBox}>
          {tabs.map((tab, index) => (
            <div 
              key={tab} 
              ref={tabsRefs[index]}
              className={`m-[auto] p-4 transition-all duration-500 ${activeTab === tab ? 'bg-[#d3983f] text-white rounded-3xl' : 'bg-white text-[#d3983f]'} hover:bg-[#d3983f] hover:text-white hover:rounded-3xl`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>
        <button className='p-4 text-6xl text-[#d3983f]' onClick={() => scrollTabs('right')}><RiArrowRightCircleLine /></button>
      </div>
      <div className="flex justify-center">
        <button className=' rounded-full py-2 px-4 bg-[#d3983f] text-white hover:bg-white hover:border hover:border-[#d3983f] hover:text-[#d3983f] transition-all duration-500'>Explorar Servico</button>
      </div>
    </>
  );
}