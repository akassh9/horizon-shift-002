"use client";

import { useState } from "react";
import { TextEditWindow } from '../../components/TextEditWindow';
import { DraggableWindow } from '../../components/DraggableWindow';
import { MacMenuBar } from '../../components/MacMenuBar';
import Image from 'next/image';
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [showWindows, setShowWindows] = useState(false);

  // Handler to be called from MacMenuBar
  const handleAddHealth = () => {
    setShowWindows(true);
  };

  return (
    <>
      <MacMenuBar onAddHealth={handleAddHealth} />
      <TextEditWindow initialPos={{ x: 694, y: 299 }} initialZIndex={1} />

      <AnimatePresence>
        {showWindows && (
          <>

            <motion.div
              key="techanswers"
              style={{ zIndex: 10 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <DraggableWindow
                id="techanswers"
                initialPos={{ x: 208, y: 115 }}
                width={210}
                height={210}
                className="bg-transparent shadow-none border-none"
                initialZIndex={10}
              >
                <Image
                  src="/images/349d3768e94b0294ee92fa6f023663b1.jpg"
                  alt="techanswers"
                  width={210}
                  height={210}
                  className="object-contain pointer-events-none select-none"
                />
              </DraggableWindow>
            </motion.div>

            <motion.div
              key="text1"
              style={{ zIndex: 20 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <DraggableWindow
                id="text1"
                initialPos={{ x: 34, y: 113 }}
                width="auto"
                height="auto"
                className="bg-white shadow-sm"
                initialZIndex={20}
              >
                <div className="p-2">
                  <p className="text-xl font-bold text-black whitespace-pre-line">Tech has the answers.</p>
                </div>
              </DraggableWindow>
            </motion.div>

            <motion.div
              key="text3"
              style={{ zIndex: 0 /* placeholder */ }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <DraggableWindow
                id="text3"
                initialPos={{ x: 346, y: 972 }}
                width="auto"
                height="auto"
                className="bg-white shadow-sm"
              >
                <div className="p-2">
                  <p className="text-xl font-bold text-black whitespace-pre-line">Always on health sensors? Check</p>
                </div>
              </DraggableWindow>
            </motion.div>

            <motion.div
              key="sensors"
              style={{ zIndex: 0 /* placeholder */ }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <DraggableWindow
                id="sensors"
                initialPos={{ x: 572, y: 792 }}
                width={210}
                height={189}
                className="bg-transparent shadow-none border-none"
              >
                <Image
                  src="/images/457dd426d8744a49ad94e94c6ad97ce7-removebg-preview.png"
                  alt="sensors"
                  width={210}
                  height={189}
                  className="object-contain pointer-events-none select-none"
                />
              </DraggableWindow>
            </motion.div>

            <motion.div
              key="surgery"
              style={{ zIndex: 30 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <DraggableWindow
                id="surgery"
                initialPos={{ x: 1824, y: 125 }}
                width={210}
                height={303.8}
                className="bg-transparent shadow-none border-none"
                initialZIndex={30}
              >
                <Image
                  src="/images/15a726f1626b6eaa60dc3c0cd394bd7e.jpg"
                  alt="surgery"
                  width={210}
                  height={303.8}
                  className="object-contain pointer-events-none select-none"
                />
              </DraggableWindow>
            </motion.div>

            <motion.div
              key="text4"
              style={{ zIndex: 31 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <DraggableWindow
                id="text4"
                initialPos={{ x: 1588, y: 357 }}
                width="auto"
                height="auto"
                className="bg-white shadow-sm"
                initialZIndex={31}
              >
                <div className="p-2">
                  <p className="text-xl font-bold text-black whitespace-pre-line">Healthcare Democratization!</p>
                </div>
              </DraggableWindow>
            </motion.div>


            <motion.div
              key="text5"
              style={{ zIndex: 0 /* placeholder */ }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <DraggableWindow
                id="text5"
                initialPos={{ x: 1265, y: 933 }}
                width="auto"
                height="auto"
                className="bg-white shadow-sm"
              >
                <div className="p-2">
                  <p className="text-xl font-bold text-black whitespace-pre-line">More information at any cost..</p>
                </div>
              </DraggableWindow>
            </motion.div>

            <motion.div
              key="info"
              style={{ zIndex: 0 /* placeholder */ }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <DraggableWindow
                id="info"
                initialPos={{ x: 1199, y: 786 }}
                width={300}
                height={167.81}
                className="bg-transparent shadow-none border-none"
              >
                <Image
                  src="/images/0259e5fa8d5ba28ef2dc1a6d8f7c3cd5-removebg-preview.png"
                  alt="info"
                  width={300}
                  height={300.9}
                  className="object-contain pointer-events-none select-none"
                />
              </DraggableWindow>
            </motion.div>

            <motion.div
              key="law"
              style={{ zIndex: 15 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <DraggableWindow
                id="law"
                initialPos={{ x: 630, y: 37 }}
                width={210}
                height={198.1}
                className="bg-transparent shadow-none border-none"
                initialZIndex={15}
              >
                <Image
                  src="/images/e2787e6d73d40030b622b2d7a036b567-removebg-preview.png"
                  alt="law"
                  width={210}
                  height={198.1}
                  className="object-contain pointer-events-none select-none"
                />
              </DraggableWindow>
            </motion.div>            

            <motion.div
              key="text6"
              style={{ zIndex: 100 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <DraggableWindow
                id="text6"
                initialPos={{ x: 734, y: 210 }}
                width="auto"
                height="auto"
                className="bg-white shadow-sm"
                initialZIndex={100}
              >
                <div className="p-2">
                  <p className="text-xl font-bold text-black whitespace-pre-line">Fear over Practice?</p>
                </div>
              </DraggableWindow>
            </motion.div>


            <motion.div
              key="text7"
              style={{ zIndex: 0 /* placeholder */ }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <DraggableWindow
                id="text7"
                initialPos={{ x: 37, y: 679 }}
                width="auto"
                height="auto"
                className="bg-white shadow-sm"
              >
                <div className="p-2">
                  <p className="text-xl font-bold text-black whitespace-pre-line">healthy = expensive</p>
                </div>
              </DraggableWindow>
            </motion.div>

            <motion.div
              key="grocery"
              style={{ zIndex: 0 /* placeholder */ }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <DraggableWindow
                id="grocery"
                initialPos={{ x: 170, y: 674 }}
                width={210}
                height={218.4}
                className="bg-transparent shadow-none border-none"
              >
                <Image
                  src="/images/114b0765eb68a0e30d72027149775d6b-removebg-preview.png"
                  alt="grocery"
                  width={210}
                  height={218.4}
                  className="object-contain pointer-events-none select-none"
                />
              </DraggableWindow>
            </motion.div>

            <motion.div
              key="text8"
              style={{ zIndex: 0 /* placeholder */ }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <DraggableWindow
                id="text8"
                initialPos={{ x: 1060, y: 234 }}
                width="auto"
                height="auto"
                className="bg-white shadow-sm"
              >
                <div className="p-2">
                  <p className="text-xl font-bold text-black whitespace-pre-line">health tycoons.</p>
                </div>
              </DraggableWindow>
            </motion.div>

            <motion.div
              key="pip"
              style={{ zIndex: 0 /* placeholder */ }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <DraggableWindow
                id="pip"
                initialPos={{ x: 1032, y: 60 }}
                width={210}
                height={157}
                className="bg-transparent shadow-none border-none"
              >
                <Image
                  src="/images/1c96de63f7fc7c4e453bba68ad82d50b.png"
                  alt="pip"
                  width={300}
                  height={218.4}
                  className="object-contain pointer-events-none select-none"
                />
              </DraggableWindow>
            </motion.div>

            <motion.div
              key="text9"
              style={{ zIndex: 0 /* placeholder */ }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <DraggableWindow
                id="text9"
                initialPos={{ x: 1517, y: 550 }}
                width="auto"
                height="auto"
                className="bg-white shadow-sm"
              >
                <div className="p-2">
                  <p className="text-xl font-bold text-black whitespace-pre-line">cures only for the payers.</p>
                </div>
              </DraggableWindow>
            </motion.div>

            <motion.div
              key="money"
              style={{ zIndex: 0 /* placeholder */ }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <DraggableWindow
                id="money"
                initialPos={{ x: 1575, y: 454 }}
                width={210}
                height={100.8}
                className="bg-transparent shadow-none border-none"
              >
                <Image
                  src="/images/upload-0a849059-a350-456a-afae-bf23b038d673.webp"
                  alt="money"
                  width={300}
                  height={218.4}
                  className="object-contain pointer-events-none select-none"
                />
              </DraggableWindow>
            </motion.div>

            <motion.div
              key="text10"
              style={{ zIndex: 0 /* placeholder */ }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <DraggableWindow
                id="text10"
                initialPos={{ x: 540, y: 541 }}
                width="auto"
                height="auto"
                className="bg-white shadow-sm"
              >
                <div className="p-2">
                  <p className="text-xl font-bold text-black whitespace-pre-line">no limits</p>
                </div>
              </DraggableWindow>
            </motion.div>

            <motion.div
              key="overreach"
              style={{ zIndex: 0 /* placeholder */ }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <DraggableWindow
                id="overreach"
                initialPos={{ x: 320, y: 399 }}
                width={250}
                height={250}
                className="bg-transparent shadow-none border-none"
              >
                <Image
                  src="/images/Generated_Image_March_14__2025_-_8_05PM.png-removebg-preview.png"
                  alt="overreach"
                  width={300}
                  height={218.4}
                  className="object-contain pointer-events-none select-none"
                />
              </DraggableWindow>
            </motion.div>

            <motion.div
              key="text11"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <DraggableWindow
                id="text11"
                initialPos={{ x: 758, y: 1033 }}
                width="auto"
                height="auto"
                className="bg-white shadow-sm"
                initialZIndex={50}
              >
                <div className="p-2">
                  <p className="text-xl font-bold text-black whitespace-pre-line">Celebrity Health Hobbies</p>
                </div>
              </DraggableWindow>
            </motion.div>

            <motion.div
              key="humanoid-img"
              style={{ zIndex: 48 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <DraggableWindow
                id="humanoid-img"
                initialPos={{ x: 1560, y: 773 }}
                width={210}
                height={275}
                className="bg-transparent shadow-none border-none"
                initialZIndex={48}
              >
                <Image
                  src="/images/c249dc08f1a868ef694b502b886d8bc4.png"
                  alt="humanoid medicine"
                  width={210}
                  height={210}
                  className="object-contain pointer-events-none select-none"
                />
              </DraggableWindow>
            </motion.div>

            <motion.div
              key="humanoid-text"
              style={{ zIndex: 49 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <DraggableWindow
                id="humanoid-text"
                initialPos={{ x: 1645, y: 1056 }}
                width="auto"
                height="auto"
                className="bg-white shadow-sm"
                initialZIndex={49}
              >
                <div className="p-2">
                  <p className="text-xl font-bold text-black whitespace-pre-line">humanoid medicine</p>
                </div>
              </DraggableWindow>
            </motion.div>

            <motion.div
              key="techlimbs-img"
              style={{ zIndex: 48 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <DraggableWindow
                id="techlimbs-img"
                initialPos={{ x: 73, y: 351 }}
                width={210}
                height={210}
                className="bg-transparent shadow-none border-none"
                initialZIndex={48}
              >
                <Image
                  src="/images/98f31dc5616193240188a453b0fafcc8-removebg-preview.png"
                  alt="Tech Limbs"
                  width={210}
                  height={210}
                  className="object-contain pointer-events-none select-none"
                />
              </DraggableWindow>
            </motion.div>

            <motion.div
              key="techlimbs-text"
              style={{ zIndex: 49 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <DraggableWindow
                id="techlimbs-text"
                initialPos={{ x: 115, y: 525 }}
                width="auto"
                height="auto"
                className="bg-white shadow-sm"
                initialZIndex={49}
              >
                <div className="p-2">
                  <p className="text-xl font-bold text-black whitespace-pre-line">Tech Limbs</p>
                </div>
              </DraggableWindow>
            </motion.div>

            <motion.div
              key="body-computer-img"
              style={{ zIndex: 49 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <DraggableWindow
                id="body-computer-img"
                initialPos={{ x: 1514, y: 54 }}
                width={210}
                height={281}
                className="bg-transparent shadow-none border-none"
                initialZIndex={48}
              >
                <Image
                  src="/images/f7a2ee3b976435fdd951779a16e1ea9a.jpg"
                  alt="Body Computer"
                  width={210}
                  height={210}
                  className="object-contain pointer-events-none select-none"
                />
              </DraggableWindow>
            </motion.div>

            <motion.div
              key="body-computer-text"
              style={{ zIndex: 49 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <DraggableWindow
                id="body-computer-text"
                initialPos={{ x: 1330, y: 78 }}
                width="auto"
                height="auto"
                className="bg-white shadow-sm"
                initialZIndex={49}
              >
                <div className="p-2">
                  <p className="text-xl font-bold text-black whitespace-pre-line">Body Computers</p>
                </div>
              </DraggableWindow>
            </motion.div>

            <motion.div
              key="aging-img"
              style={{ zIndex: 49 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <DraggableWindow
                id="aging-img"
                initialPos={{ x: 1816, y: 595 }}
                width={210}
                height={281}
                className="bg-transparent shadow-none border-none"
                initialZIndex={48}
              >
                <Image
                  src="/images/09bryanjohnson-cover-illo-superJumbo.webp"
                  alt="Anti Aging"
                  width={210}
                  height={210}
                  className="object-contain pointer-events-none select-none"
                />
              </DraggableWindow>
            </motion.div>

            <motion.div
              key="aging-text"
              style={{ zIndex: 49 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <DraggableWindow
                id="aging-text"
                initialPos={{ x: 1820, y: 877 }}
                width="auto"
                height="auto"
                className="bg-white shadow-sm"
                initialZIndex={49}
              >
                <div className="p-2">
                  <p className="text-xl font-bold text-black whitespace-pre-line">Anti Aging Race.</p>
                </div>
              </DraggableWindow>
            </motion.div>            
            
          </>
        )}
      </AnimatePresence>

      <button onClick={() => setShowWindows(true)}>Show Windows (Debug)</button>
    </>
  );
}