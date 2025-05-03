"use client";

import { useState, useEffect } from "react";
import { DraggableWindow } from '../../components/DraggableWindow';
import { TextEditWindow } from '../../components/TextEditWindow';
import { MacMenuBar } from '../../components/MacMenuBar';
import Image from 'next/image';
import { AnimatePresence, motion } from "framer-motion";
import { healthContent } from "../../data/healthContent";
import { educationContent } from "../../data/educationContent";
import { entertainmentContent } from "../../data/entertainmentContent";


// Window configuration type and data
type WindowConfig = {
  key: string;
  pos: { x: number; y: number };
  size: { width: number | 'auto'; height: number | 'auto' };
  type: 'image' | 'text';
  src?: string;
  text?: string;
};

const windows: WindowConfig[] = [
  {
    key: "techanswers",
    pos: { x: 208, y: 115 },
    size: { width: 210, height: 210 },
    type: "image",
    src: "/images/349d3768e94b0294ee92fa6f023663b1.jpg",
  },
  {
    key: "text1",
    pos: { x: 34, y: 113 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: "Tech has the answers.",
  },
  {
    key: "text3",
    pos: { x: 343, y: 989 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: "Always on health sensors? Check",
  },
  {
    key: "sensors",
    pos: { x: 569, y: 807 },
    size: { width: 210, height: 189 },
    type: "image",
    src: "/images/457dd426d8744a49ad94e94c6ad97ce7-removebg-preview.png",
  },
  {
    key: "surgery",
    pos: { x: 1824, y: 125 },
    size: { width: 210, height: 303.8 },
    type: "image",
    src: "/images/15a726f1626b6eaa60dc3c0cd394bd7e.jpg",
  },
  {
    key: "text4",
    pos: { x: 1588, y: 357 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: "Healthcare Democratization!",
  },
  {
    key: "text5",
    pos: { x: 1264, y: 947 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: "More information at any cost..",
  },
  {
    key: "info",
    pos: { x: 1196, y: 809 },
    size: { width: 300, height: 167.81 },
    type: "image",
    src: "/images/0259e5fa8d5ba28ef2dc1a6d8f7c3cd5-removebg-preview.png",
  },
  {
    key: "law",
    pos: { x: 630, y: 37 },
    size: { width: 210, height: 198.1 },
    type: "image",
    src: "/images/e2787e6d73d40030b622b2d7a036b567-removebg-preview.png",
  },
  {
    key: "text6",
    pos: { x: 734, y: 210 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: "Fear over Practice?",
  },
  {
    key: "text7",
    pos: { x: 37, y: 679 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: "healthy = expensive",
  },
  {
    key: "grocery",
    pos: { x: 170, y: 674 },
    size: { width: 210, height: 218.4 },
    type: "image",
    src: "/images/114b0765eb68a0e30d72027149775d6b-removebg-preview.png",
  },
  {
    key: "text8",
    pos: { x: 1060, y: 234 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: "health tycoons.",
  },
  {
    key: "pip",
    pos: { x: 1032, y: 60 },
    size: { width: 210, height: 157 },
    type: "image",
    src: "/images/1c96de63f7fc7c4e453bba68ad82d50b.png",
  },
  {
    key: "text9",
    pos: { x: 1517, y: 550 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: "cures only for the payers.",
  },
  {
    key: "money",
    pos: { x: 1575, y: 454 },
    size: { width: 210, height: 100.8 },
    type: "image",
    src: "/images/upload-0a849059-a350-456a-afae-bf23b038d673.webp",
  },
  {
    key: "text10",
    pos: { x: 540, y: 541 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: "no limits",
  },
  {
    key: "overreach",
    pos: { x: 320, y: 399 },
    size: { width: 250, height: 250 },
    type: "image",
    src: "/images/Generated_Image_March_14__2025_-_8_05PM.png-removebg-preview.png",
  },
  {
    key: "celebrity",
    pos: { x: 816, y: 901 },
    size: { width: 250, height: 250 },
    type: "image",
    src: "/images/ChatGPT Image Apr 26, 2025, 06_10_44 AM.png",
  },
  {
    key: "text11",
    pos: { x: 971, y: 851 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: "Celebrity Health Hobbies",
  },
  {
    key: "humanoid-img",
    pos: { x: 1560, y: 773 },
    size: { width: 210, height: 275 },
    type: "image",
    src: "/images/c249dc08f1a868ef694b502b886d8bc4.png",
  },
  {
    key: "humanoid-text",
    pos: { x: 1645, y: 1056 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: "humanoid medicine",
  },
  {
    key: "techlimbs-img",
    pos: { x: 73, y: 351 },
    size: { width: 210, height: 210 },
    type: "image",
    src: "/images/98f31dc5616193240188a453b0fafcc8-removebg-preview.png",
  },
  {
    key: "techlimbs-text",
    pos: { x: 115, y: 525 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: "Tech Limbs",
  },
  {
    key: "body-computer-img",
    pos: { x: 1514, y: 54 },
    size: { width: 210, height: 281 },
    type: "image",
    src: "/images/f7a2ee3b976435fdd951779a16e1ea9a.jpg",
  },
  {
    key: "body-computer-text",
    pos: { x: 1330, y: 78 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: "Body Computers",
  },
  {
    key: "aging-img",
    pos: { x: 1816, y: 595 },
    size: { width: 210, height: 281 },
    type: "image",
    src: "/images/09bryanjohnson-cover-illo-superJumbo.webp",
  },
  {
    key: "aging-text",
    pos: { x: 1820, y: 877 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: "Anti Aging Race.",
  },
  // ✨  NEW  — example wearable images  ✨
  {
    key: "wearable1",          // unique key
    pos: { x: 120, y: 953 },        // where it spawns
    size: { width: 700, height: 115.94 },
    type: "image",
    src: "/images/wearable1.png",
  },
  {
    key: "wearable2",
    pos: { x: 256, y: 161 },
    size: { width: 700, height: 108.41 },
    type: "image",
    src: "/images/wearable2.png",
  },
  {
    key: "wearable3",
    pos: { x: 1285, y: 849 },
    size: { width: 600, height: 157.5 },
    type: "image",
    src: "/images/wearable3.png",
  },
  {
    key: "healthassist1",          // unique key
    pos: { x: 83, y: 683 },        // where it spawns
    size: { width: 500, height: 291.2 },
    type: "image",
    src: "/images/healthassist1.png",
  },
  {
    key: "healthassist2",
    pos: { x: 106, y: 150 },
    size: { width: 400, height: 295.65 },
    type: "image",
    src: "/images/healthassist2.png",
  },
  {
    key: "healthassist3",
    pos: { x: 1285, y: 849 },
    size: { width: 600, height: 157.5 },
    type: "image",
    src: "/images/healthassist3.png",
  },
  {
    key: "marketplace1",          // unique key
    pos: { x: 83, y: 683 },        // where it spawns
    size: { width: 550, height: 102.67 },
    type: "image",
    src: "/images/marketplace1.png",
  },
  {
    key: "marketplace2",
    pos: { x: 1053, y: 192 },
    size: { width: 700, height: 59.65 },
    type: "image",
    src: "/images/marketplace2.png",
  },
  {
    key: "marketplace3",
    pos: { x: 1285, y: 849 },
    size: { width: 600, height: 76 },
    type: "image",
    src: "/images/marketplace3.png",
  },
  {
    key: "hollistic1",          // unique key
    pos: { x: 1550, y: 801 },        // where it spawns
    size: { width: 550, height: 75.77 },
    type: "image",
    src: "/images/hollistic1.png",
  },
  {
    key: "hollistic2",
    pos: { x: 907, y: 915 },
    size: { width: 700, height: 203.57 },
    type: "image",
    src: "/images/hollistic2.png",
  },
  {
    key: "hollistic3",
    pos: { x: 23, y: 101 },
    size: { width: 600, height: 366 },
    type: "image",
    src: "/images/hollistic3.png",
  },
  {
    key:"diy1",
    pos: { x: 182, y: 939 },
    size: { width: 800, height: 70 },
    type: "image",
    src: "/images/diy1.png",
  },
  {
    key:"diy2",
    pos: { x: 392, y: 135 },
    size: { width: 550, height: 137 },
    type: "image",
    src: "/images/diy2.png",
  },
  {
    key:"diy3",
    pos: { x: 1180, y: 162 },
    size: { width: 900, height: 97 },
    type: "image",
    src: "/images/diy3.png",
  },
  {
    key:"debt1",
    pos: { x: 1452, y: 847 },
    size: { width: 700, height: 164 },
    type: "image",
    src: "/images/debt1.png",
  },
  {
    key:"debt2",
    pos: { x: 54, y: 879 },
    size: { width: 600, height: 104.04 },
    type: "image",
    src: "/images/debt2.png",
  },
  {
    key:"debt3",
    pos: { x: 1547, y: 288 },
    size: { width: 500, height: 140.74 },
    type: "image",
    src: "/images/debt3.png",
  },
  {
    key:"crypto1",
    pos: { x: 606, y: 93 },
    size: { width: 700, height: 155 },
    type: "image",
    src: "/images/crypto1.png",
  },
  {
    key:"crypto2",
    pos: { x: 306, y: 887 },
    size: { width: 700, height: 78.39 },
    type: "image",
    src: "/images/crypto2.png",
  },
  {
    key:"crypto3",
    pos: { x: 1368, y: 879 },
    size: { width: 700, height: 117 },
    type: "image",
    src: "/images/crypto3.png",
  },
  {
    key:"price1",
    pos: { x: 136, y: 377 },
    size: { width: 500, height: 148 },
    type: "image",
    src: "/images/price1.png",
  },
  {
    key:"price2",
    pos: { x: 528, y: 154 },
    size: { width: 650, height: 99 },
    type: "image",
    src: "/images/price2.png",
  },
  {
    key:"price3",
    pos: { x: 1272, y: 876 },
    size: { width: 650, height: 146 },
    type: "image",
    src: "/images/price3.png",
  },
  // Whole New World – HAPPENED scenario images (3 per theme)
  // Life-Extension & Longevity
  {
    key: "aging1",
    pos: { x: 178, y: 152 },
    size: { width: 450, height: 210 },
    type: "image",
    src: "/images/aging1.png",
  },
  {
    key: "aging2",
    pos: { x: 123, y: 613 },
    size: { width: 500, height: 117.13 },
    type: "image",
    src: "/images/aging2.png",
  },
  {
    key: "aging3",
    pos: { x: 1523, y: 138 },
    size: { width: 500, height: 131 },
    type: "image",
    src: "/images/aging3.png",
  },
  // Human Enhancement & Prosthetics
  {
    key: "enhance1",
    pos: { x: 81, y: 151 },
    size: { width: 500, height: 144 },
    type: "image",
    src: "/images/enhance1.png",
  },
  {
    key: "enhance2",
    pos: { x: 94, y: 527 },
    size: { width: 500, height: 548 },
    type: "image",
    src: "/images/enhance2.webp",
  },
  {
    key: "enhance3",
    pos: { x: 890, y: 871 },
    size: { width: 900, height: 131 },
    type: "image",
    src: "/images/enhance3.png",
  },
  // Genetic Editing & Designer Babies
  {
    key: "gene1",
    pos: { x: 546, y: 67 },
    size: { width: 500, height: 185 },
    type: "image",
    src: "/images/gene1.png",
  },
  {
    key: "gene2",
    pos: { x: 355, y: 870 },
    size: { width: 500, height: 70 },
    type: "image",
    src: "/images/gene2.png",
  },
  {
    key: "gene3",
    pos: { x: 1149, y: 858 },
    size: { width: 500, height: 137 },
    type: "image",
    src: "/images/gene3.png",
  },
  // Ethics, Regulation & Identity
  {
    key: "ethics1",
    pos: { x: 114, y: 169 },
    size: { width: 500, height: 151.39 },
    type: "image",
    src: "/images/ethics1.png",
  },
  {
    key: "ethics2",
    pos: { x: 91, y: 867 },
    size: { width: 900, height: 182 },
    type: "image",
    src: "/images/ethics2.png",
  },
  {
    key: "ethics3",
    pos: { x: 1575, y: 77 },
    size: { width: 500, height: 260 },
    type: "image",
    src: "/images/ethics3.png",
  },
  {
    key: "ide1",
    pos: { x: 208, y: 115 },
    size: { width: 210, height: 300.5 },
    type: "image",
    src: "/images/ide1.jpg",
  },
  {
    key: "ide1-text",
    pos: { x: 34, y: 113 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: "Ideological Teacher Exodus.",
  },
  {
    key: "ide2",
    pos: { x: -15, y: 720 },
    size: { width: 300, height: 200.8 },
    type: "image",
    src: "/images/ide2.png",
  },
  {
    key: "ide2-text",
    pos: { x: 81, y: 909 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: "A Menu of Independent Schools",
  },
  {
    key: "ide3",
    pos: { x: 1843, y: 353 },
    size: { width: 300, height: 199.69 },
    type: "image",
    src: "/images/ide3.jpg",
  },
  {
    key: "ide3-text",
    pos: { x: 1834, y: 549 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: "Responses to Grading Bias",
  },
  {
    key: "ide4",
    pos: { x: 976, y: 863 },
    size: { width: 400, height: 225.6 },
    type: "image",
    src: "/images/ide4.webp",
  },
  {
    key: "ide4-text",
    pos: { x: 1208, y: 893 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: "Schoolboards as political microenvironments",
  },
  {
    key: "arms1",
    pos: { x: 630, y: 37 },
    size: { width: 210, height: 198.1 },
    type: "image",
    src: "/images/arms1.png",
  },
  {
    key: "arms1-text",
    pos: { x: 734, y: 210 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: "Timing it Right",
  },
  {
    key: "arms2-text",
    pos: { x: 363, y: 774 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: "padding trascripts.",
  },
  {
    key: "arms2",
    pos: { x: 499, y: 690 },
    size: { width: 210, height: 286 },
    type: "image",
    src: "/images/arms2.png",
  },
  {
    key: "arms3",
    pos: { x: 1109, y: 84 },
    size: { width: 300, height: 168 },
    type: "image",
    src: "/images/arms3.webp",
  },
  {
    key: "arms3-text",
    pos: { x: 938, y: 55 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: "Schools built around getting ahead.",
  },
  {
    key: "arms4-text",
    pos: { x: 1517, y: 550 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: "pay to play.",
  },
  {
    key: "arms4",
    pos: { x: 1575, y: 454 },
    size: { width: 210, height: 100.8 },
    type: "image",
    src: "/images/upload-0a849059-a350-456a-afae-bf23b038d673.webp",
  },
  {
    key: "cliff1",
    pos: { x: 1745, y: 58 },
    size: { width: 350, height: 233.33 },
    type: "image",
    src: "/images/cliff1.webp",
  },
  {
    key: "cliff1-text",
    pos: { x: 1701, y: 234 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: "apprenticeship.",
  },
  {
    key: "cliff2",
    pos: { x: 44, y: 492 },
    size: { width: 350, height: 196.93 },
    type: "image",
    src: "/images/cliff2.jpg",
  },
  {
    key: "cliff2-text",
    pos: { x: 230, y: 473 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: "Diversyfying Offerings",
  },
  {
    key: "cliff3",
    pos: { x: 1893, y: 788 },
    size: { width: 210, height: 316.6 },
    type: "image",
    src: "/images/cliff3.jpg",
  },
  {
    key: "cliff3-text",
    pos: { x: 1670, y: 919 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: "International Student Revenue",
  },
  {
    key: "cliff4",
    pos: { x: 480, y: 279 },
    size: { width: 210, height: 197 },
    type: "image",
    src: "/images/cliff4.png",
  },
  {
    key: "cliff4-text",
    pos: { x: 497, y: 451 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: "Is there a point?",
  },
  //headlines education
    //culture
  {
    key: "culture1",         
    pos: { x: 120, y: 953 },       
    size: { width: 700, height: 115.94 },
    type: "image",
    src: "/images/culture1.png",
  },
  {
    key: "culture2",
    pos: { x: 256, y: 161 },
    size: { width: 700, height: 108.41 },
    type: "image",
    src: "/images/culture2.png",
  },
  {
    key: "culture3",
    pos: { x: 1285, y: 849 },
    size: { width: 600, height: 69 },
    type: "image",
    src: "/images/culture3.png",
  },
    //home
  {
    key: "home1",
    pos: { x: 106, y: 150 },
    size: { width: 400, height: 150 },
    type: "image",
    src: "/images/home1.png",
  },
  {
    key: "home2",
    pos: { x: 1285, y: 849 },
    size: { width: 600, height: 157.5 },
    type: "image",
    src: "/images/home2.png",
  },
  {
    key: "home3",          
    pos: { x: 83, y: 683 },      
    size: { width: 550, height: 102.67 },
    type: "image",
    src: "/images/home3.png",
  },
    //censor
  {
    key: "censor1",
    pos: { x: 1170, y: 59 },
    size: { width: 700, height: 198.66 },
    type: "image",
    src: "/images/censor1.png",
  },
  {
    key: "censor2",
    pos: { x: 1285, y: 849 },
    size: { width: 600, height: 205 },
    type: "image",
    src: "/images/censor2.png",
  },
  {
    key: "censor3",          
    pos: { x: 61, y: 601 },       
    size: { width: 550, height: 99.91 },
    type: "image",
    src: "/images/censor3.png",
  },
    //values
  {
    key: "values1",
    pos: { x: 1091, y: 848 },
    size: { width: 700, height: 106.46 },
    type: "image",
    src: "/images/values1.png",
  },
  {
    key: "values2",
    pos: { x: 23, y: 101 },
    size: { width: 600, height: 101 },
    type: "image",
    src: "/images/values2.png",
  },
  {
    key:"values3",
    pos: { x: 182, y: 939 },
    size: { width: 800, height: 129 },
    type: "image",
    src: "/images/values3.png",
  },
    //redshirting
  {
    key:"red1",
    pos: { x: 64, y: 126 },
    size: { width: 550, height: 180 },
    type: "image",
    src: "/images/red1.png",
  },
  {
    key:"red2",
    pos: { x: 1153, y: 47 },
    size: { width: 900, height: 221 },
    type: "image",
    src: "/images/red2.png",
  },
  {
    key:"red3",
    pos: { x: 546, y: 880 },
    size: { width: 700, height: 93.33 },
    type: "image",
    src: "/images/red3.png",
  },
    //pay
  {
    key:"pay1",
    pos: { x: 54, y: 879 },
    size: { width: 600, height: 128 },
    type: "image",
    src: "/images/pay1.png",
  },
  {
    key:"pay2",
    pos: { x: 1256, y: 134 },
    size: { width: 500, height: 102 },
    type: "image",
    src: "/images/pay2.png",
  },
  {
    key:"pay3",
    pos: { x: 91, y: 115 },
    size: { width: 700, height: 125 },
    type: "image",
    src: "/images/pay3.png",
  },
    //cred
  {
    key:"cred1",
    pos: { x: 1071, y: 880 },
    size: { width: 700, height: 147 },
    type: "image",
    src: "/images/cred1.png",
  },
  {
    key:"cred2",
    pos: { x: 136, y: 377 },
    size: { width: 500, height: 65.5 },
    type: "image",
    src: "/images/cred2.png",
  },
  {
    key:"cred3",
    pos: { x: 528, y: 154 },
    size: { width: 650, height: 99 },
    type: "image",
    src: "/images/cred3.png",
  },
    //test
  {
    key:"test1",
    pos: { x: 1272, y: 876 },
    size: { width: 650, height: 166.25 },
    type: "image",
    src: "/images/test1.png",
  },
  {
    key: "test2",
    pos: { x: 178, y: 152 },
    size: { width: 450, height: 210 },
    type: "image",
    src: "/images/test2.png",
  },
  {
    key: "test3",
    pos: { x: 123, y: 613 },
    size: { width: 500, height: 167 },
    type: "image",
    src: "/images/test3.png",
  },
  //demographic
  {
    key: "demo1",
    pos: { x: 1523, y: 138 },
    size: { width: 500, height: 145 },
    type: "image",
    src: "/images/demo1.png",
  },
  {
    key: "demo2",
    pos: { x: 81, y: 151 },
    size: { width: 500, height: 102 },
    type: "image",
    src: "/images/demo2.png",
  },
  {
    key: "demo3",
    pos: { x: 19, y: 587 },
    size: { width: 650, height: 121.2 },
    type: "image",
    src: "/images/demo3.png",
  },
    //tuition
  {
    key: "tuition1",
    pos: { x: 1147, y: 849 },
    size: { width: 900, height: 211 },
    type: "image",
    src: "/images/tuition1.png",
  },
  {
    key: "tuition2",
    pos: { x: 250, y: 120 },
    size: { width: 500, height: 98 },
    type: "image",
    src: "/images/tuition2.png",
  },
  {
    key: "tuition3",
    pos: { x: 49, y: 571 },
    size: { width: 600, height: 121.5 },
    type: "image",
    src: "/images/tuition3.png",
  },
    //corp
  {
    key: "corp1",
    pos: { x: 1605, y: 685 },
    size: { width: 500, height: 195 },
    type: "image",
    src: "/images/corp1.png",
  },
  {
    key: "corp2",
    pos: { x: 287, y: 80 },
    size: { width: 500, height: 89 },
    type: "image",
    src: "/images/corp2.png",
  },
  {
    key: "corp3",
    pos: { x: 58, y: 205 },
    size: { width: 500, height: 772.73 },
    type: "image",
    src: "/images/corp3.jpeg",
  },
    //altfin
  {
    key: "altfin1",
    pos: { x: 1575, y: 77 },
    size: { width: 500, height: 141.67 },
    type: "image",
    src: "/images/altfin1.png",
  },
  {
    key: "altfin2",
    pos: { x: 114, y: 169 },
    size: { width: 500, height: 68 },
    type: "image",
    src: "/images/altfin2.png",
  },
  {
    key: "altfin3",
    pos: { x: 91, y: 867 },
    size: { width: 900, height: 167.81 },
    type: "image",
    src: "/images/altfin3.png",
  },
//entertainment main
  //fifth wall
  {
    key: "fifth1",
    pos: { x: 169, y: 116 },
    size: { width: 300, height: 168 },
    type: "image",
    src: "/images/fifth1.jpg",
  },
  {
    key: "fifth1-text",
    pos: { x: 34, y: 113 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: "Interaction at its core.",
  },
  {
    key: "fifth2",
    pos: { x: 60, y: 687 },
    size: { width: 250, height: 350.17 },
    type: "image",
    src: "/images/fifth2.jpg",
  },
  {
    key: "fifth2-text",
    pos: { x: 271, y: 663 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: "Walking into Art.",
  },
  {
    key: "fifth3",
    pos: { x: 1640, y: 400 },
    size: { width: 300, height: 225 },
    type: "image",
    src: "/images/fifth3.jpg",
  },
  {
    key: "fifth3-text",
    pos: { x: 1894, y: 614 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: "Real Fictional",
  },
  {
    key: "fifth4-text",
    pos: { x: 792, y: 1040 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: "A new Camera, a new Screen",
  },
  {
    key: "fifth4",
    pos: { x: 792, y: 888 },
    size: { width: 400, height: 176.6 },
    type: "image",
    src: "/images/fifth4.png",
  },
    //headlines for fifth wall
    //immersive AR/VR
    {
      key: "imm1",         
      pos: { x: 120, y: 953 },       
      size: { width: 700, height: 115.94 },
      type: "image",
      src: "/images/imm1.png",
    },
    {
      key: "imm2",
      pos: { x: 72, y: 85 },
      size: { width: 500, height: 468.41 },
      type: "image",
      src: "/images/imm2.png",
    },
    {
      key: "imm3",
      pos: { x: 1285, y: 849 },
      size: { width: 600, height: 69 },
      type: "image",
      src: "/images/imm3.png",
    },
      //Experential installations and pop ups
    {
      key: "exp1",
      pos: { x: 106, y: 150 },
      size: { width: 400, height: 150 },
      type: "image",
      src: "/images/exp1.png",
    },
    {
      key: "exp2",
      pos: { x: 1285, y: 849 },
      size: { width: 600, height: 157.5 },
      type: "image",
      src: "/images/exp2.png",
    },
    {
      key: "exp3",          
      pos: { x: 83, y: 683 },      
      size: { width: 550, height: 102.67 },
      type: "image",
      src: "/images/exp3.png",
    },
      //Wearables and neural feel tech
    {
      key: "wear1",
      pos: { x: 1376, y: 74 },
      size: { width: 500, height: 198.66 },
      type: "image",
      src: "/images/wear1.png",
    },
    {
      key: "wear2",
      pos: { x: 1285, y: 849 },
      size: { width: 600, height: 205 },
      type: "image",
      src: "/images/wear2.png",
    },
    {
      key: "wear3",          
      pos: { x: 77, y: 370 },       
      size: { width: 550, height: 603 },
      type: "image",
      src: "/images/enhance2.webp",
    },
      //fandom toursim
    {
      key: "fan1",
      pos: { x: 1091, y: 848 },
      size: { width: 700, height: 106.46 },
      type: "image",
      src: "/images/fan1.png",
    },
    {
      key: "fan2",
      pos: { x: 23, y: 101 },
      size: { width: 600, height: 101 },
      type: "image",
      src: "/images/fan2.png",
    },
    {
      key:"fan3",
      pos: { x: 182, y: 939 },
      size: { width: 800, height: 129 },
      type: "image",
      src: "/images/fan3.png",
    },
    //when the ai credits roll
   {
    key: "ai1",
    pos: { x: 1506, y: 702 },
    size: { width: 250, height: 250.4 },
    type: "image",
    src: "/images/ai1.png",
   },
  {
    key: "ai1-text",
    pos: { x: 1539, y: 715 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: "Investor Predicaments.",
  },
  {
    key: "ai2",
    pos: { x: 474, y: 789 },
    size: { width: 210, height: 261.84 },
    type: "image",
    src: "/images/ai2.webp",
  },
  {
    key: "ai2-text",
    pos: { x: 360, y: 797 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: "Execution Bloopers",
  },
  {
    key: "ai3",
    pos: { x: 1109, y: 84 },
    size: { width: 300, height: 168 },
    type: "image",
    src: "/images/ai3.webp",
  },
  {
    key: "ai3-text",
    pos: { x: 938, y: 55 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: " Creativity Crisis. ",
  },
  {
    key: "ai4-text",
    pos: { x: 1953, y: 892 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: "legal pushback.",
  },
  {
    key: "ai4",
    pos: { x: 1924, y: 723 },
    size: { width: 210, height: 148.8 },
    type: "image",
    src: "/images/ai4.png",
  },
    //headlines for when the ai credits roll
    //Generative‑AI Tool Investments
    {
      key: "gen1",         
      pos: { x: 1255, y: 856 },       
      size: { width: 700, height: 205 },
      type: "image",
      src: "/images/inv1.png",
    },
    {
      key: "gen2",
      pos: { x: 43, y: 104 },
      size: { width: 500, height: 344.41 },
      type: "image",
      src: "/images/inv2.png",
    },
    {
      key: "gen3",
      pos: { x: 1460, y: 141 },
      size: { width: 600, height: 94 },
      type: "image",
      src: "/images/inv3.png",
    },
      //AI Controversies & Legal Pushback
    {
      key: "cont1",
      pos: { x: 106, y: 150 },
      size: { width: 700, height: 108.26 },
      type: "image",
      src: "/images/cont1.png",
    },
    {
      key: "cont2",
      pos: { x: 1396, y: 146 },
      size: { width: 600, height: 86 },
      type: "image",
      src: "/images/cont2.png",
    },
    {
      key: "cont3",          
      pos: { x: 120, y: 890 },      
      size: { width: 550, height: 78.83 },
      type: "image",
      src: "/images/cont3.png",
    },
      //Automation of Creative Roles
    {
      key: "auto1",
      pos: { x: 1170, y: 59 },
      size: { width: 700, height: 198.66 },
      type: "image",
      src: "/images/auto1.png",
    },
    {
      key: "auto2",
      pos: { x: 1285, y: 849 },
      size: { width: 600, height: 91 },
      type: "image",
      src: "/images/auto2.png",
    },
    {
      key: "auto3",          
      pos: { x: 139, y: 104 },       
      size: { width: 540, height: 99.91 },
      type: "image",
      src: "/images/auto3.png",
    },
      //Investor Uncertainty & Market Shifts
    {
      key: "unc1",
      pos: { x: 1380, y: 876 },
      size: { width: 700, height: 106.46 },
      type: "image",
      src: "/images/unc1.png",
    },
    {
      key: "unc2",
      pos: { x: 23, y: 101 },
      size: { width: 600, height: 101 },
      type: "image",
      src: "/images/unc2.png",
    },
    {
      key:"unc3",
      pos: { x: 83, y: 851 },
      size: { width: 800, height: 166 },
      type: "image",
      src: "/images/unc3.png",
    },
  //artists are king 
  {
    key: "king1",
    pos: { x: 637, y: 27 },
    size: { width: 350, height: 233.33 },
    type: "image",
    src: "/images/king1.png",
  },
  {
    key: "king1-text",
    pos: { x: 550, y: 199 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: "The artist manifesto.",
  },
  {
    key: "king2",
    pos: { x: 99, y: 345 },
    size: { width: 200, height: 196.93 },
    type: "image",
    src: "/images/king2.png",
  },
  {
    key: "king2-text",
    pos: { x: 310, y: 436 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: "Authenticity on scale.",
  },
  {
    key: "king3",
    pos: { x: 1221, y: 821 },
    size: { width: 210, height: 316.6 },
    type: "image",
    src: "/images/king3.png",
  },
  {
    key: "king3-text",
    pos: { x: 1161, y: 1074 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: " Music Tour or Cultural Phenomenon?",
  },
  {
    key: "king4",
    pos: { x: 1823, y: 55 },
    size: { width: 210, height: 197 },
    type: "image",
    src: "/images/king4.jpg",
  },
  {
    key: "king4-text",
    pos: { x: 1590, y: 179 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: "Diverse Music Charts",
  },
    //headlines for artists are king
    //Authenticity & Phenomenon Tours
    {
      key: "auth1",         
      pos: { x: 67, y: 828 },       
      size: { width: 700, height: 281 },
      type: "image",
      src: "/images/auth1.png",
    },
    {
      key: "auth2",
      pos: { x: 83, y: 77 },
      size: { width: 700, height: 163 },
      type: "image",
      src: "/images/auth2.png",
    },
    {
      key: "auth3",
      pos: { x: 1282, y: 903 },
      size: { width: 600, height: 140 },
      type: "image",
      src: "/images/auth3.png",
    },
      //Diverse Charts & Non‑Formulaic Hits
    {
      key: "div1",
      pos: { x: 73, y: 200 },
      size: { width: 500, height: 215 },
      type: "image",
      src: "/images/div1.png",
    },
    {
      key: "div2",
      pos: { x: 666, y: 127 },
      size: { width: 600, height: 97.5 },
      type: "image",
      src: "/images/div2.png",
    },
    {
      key: "div3",          
      pos: { x: 83, y: 683 },      
      size: { width: 550, height: 195.67 },
      type: "image",
      src: "/images/div3.png",
    },
      //Indie Success & VC Funding
    {
      key: "ind1",
      pos: { x: 1411, y: 57 },
      size: { width: 500, height: 198.66 },
      type: "image",
      src: "/images/ind1.png",
    },
    {
      key: "ind2",
      pos: { x: 1285, y: 849 },
      size: { width: 600, height: 171 },
      type: "image",
      src: "/images/ind2.png",
    },
    {
      key: "ind3",          
      pos: { x: 66, y: 93 },       
      size: { width: 800, height: 99.91 },
      type: "image",
      src: "/images/ind3.png",
    },
      //Direct‑to‑Fan Platforms & Monetization
    {
      key: "d21",
      pos: { x: 1091, y: 848 },
      size: { width: 700, height: 270.46 },
      type: "image",
      src: "/images/d21.png",
    },
    {
      key: "d22",
      pos: { x: 23, y: 101 },
      size: { width: 600, height: 153 },
      type: "image",
      src: "/images/d22.png",
    },
    {
      key:"d23",
      pos: { x: 182, y: 939 },
      size: { width: 800, height: 164 },
      type: "image",
      src: "/images/d23.png",
    },
];
// --- hyperlinks for special draggables ---
const linkMap: Record<string, string> = {
  wearable1: "https://www.tandfonline.com/doi/full/10.1080/08164622.2025.2492761?utm_source=chatgpt.com",
  wearable2: "https://time.com/6304107/full-body-mri-health-scan/?utm_source=chatgpt.com",
  wearable3: "https://www.gssiweb.org/sports-science-exchange/article/gx-sweat-patch-and-app-for-personalized-hydration",
  healthassist1: "https://nextdigitalhealth.com/healthcaretechnology/connected-health/symptomate-review-2024-check-your-symptoms-online/?utm_source=chatgpt.com",
  healthassist2: "https://www.tctmd.com/news/fda-clears-ai-ecg-screening-tools-cv-care-whats-next-grabs?utm_source=chatgpt.com",
  healthassist3: "https://www.washingtonpost.com/opinions/2025/04/22/ai-health-care-expert-opinions/?utm_source=chatgpt.com",
  marketplace1: "https://blockchainhealthcaretoday.com/index.php/journal/article/view/338?utm_source=chatgpt.com",
  marketplace3: "https://kms-healthcare.com/blog/data-monetization-in-healthcare/?utm_source=chatgpt.com",
  marketplace2: "https://time.com/7271463/23andme-data-ai-bankruptcy/?utm_source=chatgpt.com",
  hollistic1: "https://www.fairhealth.org/article/getting-covered-for-alternative-medicine-2023?utm_source=chatgpt.com",
  hollistic2: "https://www.verywellhealth.com/fda-panel-rejects-mdma-therapy-for-ptsd-8659953?utm_source=chatgpt.com",
  hollistic3: "https://www.medicare.gov/coverage/acupuncture?utm_source=chatgpt.com",
  diy1:"https://www.mpo-mag.com/exclusives/ai-assisted-physical-therapy-empowers-patients-on-the-road-to-recovery/?utm_source=chatgpt.com",
  diy2:"https://phys.org/news/2024-05-easy-pill-swallow-3d-paves.html?utm_source=chatgpt.com",
  diy3:"https://www.wired.com/story/glp-1-compounding-fda-lawsuits/?utm_source=chatgpt.com",
  debt1:"https://www.kff.org/health-costs/issue-brief/the-burden-of-medical-debt-in-the-united-states/?utm_source=chatgpt.com",
  debt2:"https://www.npr.org/sections/health-shots/2023/06/26/1184105496/were-not-doing-that-a-black-couple-wont-crowdfund-to-pay-medical-debt?utm_source=chatgpt.com",
  debt3:"https://www.npr.org/sections/health-shots/2024/05/21/1252428534/he-fell-ill-on-a-cruise-before-he-boarded-the-rescue-boat-they-handed-him-the-bi?utm_source=chatgpt.com",
  crypto1:"https://pmc.ncbi.nlm.nih.gov/articles/PMC11281776/?utm_source=chatgpt.com",
  crypto2:"https://www.einpresswire.com/article/746323248/garm-clinic-now-accepts-cryptocurrency-for-patient-services?utm_source=chatgpt.com",
  crypto3:"https://blockchainhealthcaretoday.com/index.php/journal/article/view/245?utm_source=chatgpt.com",
  price1:"https://www.fiercehealthcare.com/health-tech/price-transparency-startup-turquoise-health-picks-30m-series-b-funding?utm_source=chatgpt.com",
  price2:"https://medcitynews.com/2024/01/hospitals-price-transparency/?utm_source=chatgpt.com",
  price3:"https://finance.yahoo.com/news/mdsave-launches-transparency-product-cms-140000204.html?utm_source=chatgpt.com",
  aging1:"https://www.bloomberg.com/news/features/2023-01-25/anti-aging-techniques-taken-to-extreme-by-bryan-johnson?utm_source=chatgpt.com",
  aging2:"https://www.nia.nih.gov/news/senolytic-therapy-shows-subtle-impact-age-related-bone-health-women?utm_source=chatgpt.com",
  aging3:"https://techcrunch.com/2021/04/23/longevity-startup-longevica-plans-to-launch-supplements-based-on-long-term-research/?utm_source=chatgpt.com",
  enhance1:"https://www.sciencenews.org/article/new-device-sense-temperature-prosthetic-hand-touch?utm_source=chatgpt.com",
  enhance2:"https://www.theverge.com/2024/1/29/24055167/elon-musk-has-news-on-neuralinks-first-human-implant-and-a-new-product-name-telepathy?utm_source=chatgpt.com",
  enhance3:"https://www.wired.com/story/the-us-armys-vision-of-an-exoskeleton-future-lives-on/?utm_source=chatgpt.com",
  gene1:"https://www.theguardian.com/us-news/2023/dec/08/fda-new-treatment-sickle-cell-disease?utm_source=chatgpt.com",
  gene2:"https://www.theguardian.com/society/2023/nov/16/uk-medicines-regulator-approves-casgevy-gene-therapy-for-two-blood-disorders-sickle-cell?utm_source=chatgpt.com",
  gene3:"https://www.theguardian.com/science/2021/oct/17/polygenic-screening-of-embryos-is-here-but-is-it-ethical?utm_source=chatgpt.com",
  ethics1:"https://www.who.int/news/item/12-07-2021-who-issues-new-recommendations-on-human-genome-editing-for-the-advancement-of-public-health?utm_source=chatgpt.com",
  ethics2:"https://www.fda.gov/media/182567/download?utm_source=chatgpt.com",
  ethics3:"https://www.theguardian.com/commentisfree/2025/apr/23/america-pro-natalism-women?utm_source=chatgpt.com",
  culture1:"https://www.npr.org/2023/01/22/1150259944/florida-rejects-ap-class-african-american-studies?utm_source=chatgpt.com",
  culture2:"https://apnews.com/article/race-and-ethnicity-racial-injustice-business-education-government-and-politics-905c354a805cec1785160cf21f04c7ec?utm_source=chatgpt.com",
  culture3:"https://pen.org/book-bans/pen-america-index-of-school-book-bans-2023-2024/?utm_source=chatgpt.com",
  home1:"https://www.census.gov/library/stories/2021/03/homeschooling-on-the-rise-during-covid-19-pandemic.html?utm_source=chatgpt.com",
  home2:"https://techcrunch.com/2022/06/13/prenda-raises-20m-led-by-776-to-build-tech-to-run-k-8-microschools/?utm_source=chatgpt.com",
  home3:"https://www.washingtonpost.com/education/interactive/2023/homeschooling-growth-data-by-district/?utm_source=chatgpt.com",
  censor1:"https://www.npr.org/2023/06/22/1183701813/facing-book-bans-and-restrictions-on-lessons-teachers-are-scared-and-self-censor?utm_source=chatgpt.com",
  censor2:"https://pen.org/report/americas-censored-classrooms-2024/?utm_source=chatgpt.com",
  censor3:"https://apnews.com/article/coronavirus-pandemic-science-business-health-education-40ac2a2ec38c893b7c7a8dd196ce8b29?utm_source=chatgpt.com",
  values1:"https://apnews.com/article/education-arizona-doug-ducey-school-vouchers-7c5d7eb0498e5e7234d7eeb726027506?utm_source=chatgpt.com",
  values2:"https://apnews.com/article/business-education-michigan-tennessee-charter-schools-d9154ad70858a080c0d567fa71a9de3b?utm_source=chatgpt.com",
  values3:"https://apnews.com/article/a34be626074ef4d4ded987f841ff9aa8?utm_source=chatgpt.com",
  red1:"https://www.washingtonpost.com/opinions/2023/07/10/christine-emba-masculinity-new-model/?utm_source=chatgpt.com",
  red2:"https://apnews.com/article/f6a0c3a8f97f8d6cf616f201f68c04fe?utm_source=chatgpt.com",
  red3:"https://apnews.com/article/b6c9017f603c00466b9e9908c5f2183a?utm_source=chatgpt.com",
  pay1:"https://www.forbes.com/sites/ryancraig/2024/07/26/how-to-make-college-admissions-a-little-less-unequal/?utm_source=chatgpt.com",
  pay2:"https://www.forbes.com/sites/frederickhess/2023/12/19/why-are-elite-colleges-enabling-this-dubious-racket/?utm_source=chatgpt.com",
  pay3:"https://www.businessinsider.com/parents-pay-millions-college-counselor-harvard-ivy-league-acceptance-letter-2023-9?utm_source=chatgpt.com",
  cred1:"https://www.insidehighered.com/news/admissions/traditional-age/2023/10/23/assessing-college-readiness-pandemic-generation?utm_source=chatgpt.com",
  cred2:"https://www.insidehighered.com/news/quick-takes/2023/12/06/nearly-80-percent-grades-yale-were-last-year?utm_source=chatgpt.com",
  cred3:"https://www.forbes.com/sites/brennanbarnard/2023/11/21/will-ai-be-reviewing-your-college-application/?utm_source=chatgpt.com",
  test1:"https://newsroom.collegeboard.org/digital-sat-launches-across-country-completing-transition-digital-and-providing-simpler-testing?utm_source=chatgpt.com",
  test2:"https://www.marketwatch.com/press-release/test-preparation-market-to-grow-by-usd-16-28-billion-from-2024-2028-driven-by-online-test-prep-emphasis-with-ai-driving-market-transformation-technavio-bc92fbc8?utm_source=chatgpt.com",
  test3:"https://www.freethink.com/consumer-tech/khanmigo-ai-tutor?utm_source=chatgpt.com",
  demo1:"https://www.npr.org/2025/01/08/nx-s1-5246200/demographic-cliff-fewer-college-students-mean-fewer-graduates?utm_source=chatgpt.com",
  demo2:"https://apnews.com/article/d4851555bd0fb360a92dee84a2d93140?utm_source=chatgpt.com",
  demo3:"https://www.insidehighered.com/news/business/financial-health/2023/12/21/look-back-college-closures-and-mergers-2023?utm_source=chatgpt.com",
  tuition1:"https://www.insidehighered.com/news/business/revenue-strategies/2023/09/15/amid-skepticism-colleges-value-tuition-resets-keep?utm_source=chatgpt.com",
  tuition2:"https://www.forbes.com/sites/michaeltnietzel/2023/11/06/small-colleges-turning-to-these-tuition-deals-to-boost-enrollment/?utm_source=chatgpt.com",
  tuition3:"https://www.forbes.com/sites/michaeltnietzel/2024/12/20/as-competition-heats-up-more-colleges-freeze-tuition-or-make-it-free/?utm_source=chatgpt.com",
  corp1:"https://www.aboutamazon.com/news/workplace/career-choice-free-education-for-amazon-employees?utm_source=chatgpt.com",
  corp2:"https://fortune.com/education/articles/a-tipping-point-for-higher-ed-google-launches-new-low-cost-online-programs-for-high-demand-jobs/?utm_source=chatgpt.com",
  corp3:"https://www.linkedin.com/posts/palantir-technologies_skip-the-debt-skip-the-indoctrination-get-activity-7316432877577986049-gNjy/",
  altfin1:"https://www.insidehighered.com/news/students/financial-aid/2024/02/06/critics-colleges-disagree-equity-differential-tuition?utm_source=chatgpt.com",
  altfin2:"https://www.latimes.com/opinion/story/2024-04-30/college-tuition-costs-major-student-loans?utm_source=chatgpt.com",
  altfin3:"https://www.insidehighered.com/news/2022/06/23/purdue-pauses-new-income-share-agreement-enrollments?utm_source=chatgpt.com",

};

// Renderer component for each window
function MotionWindow({
  cfg,
  bringToFront,
  highlighted = false,
}: {
  cfg: WindowConfig;
  bringToFront: (id: string) => void;
  highlighted?: boolean;
}) {
  return (
    <motion.div
      key={cfg.key}
      onPointerDown={() => {
        // Don’t bring “king4” to front
        if (cfg.key !== "king4") bringToFront(cfg.key);
      }}
      style={{ }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <DraggableWindow
        id={cfg.key}
        initialPos={cfg.pos}
        initialZIndex={cfg.key === "king4" ? 0 : undefined}
        width={cfg.size.width}
        height={cfg.size.height}
        className={`${
          cfg.type === "text"
            ? "bg-white shadow-sm"
            : "bg-transparent shadow-none border-none"
        } ${highlighted ? "ring-4 ring-blue-400" : ""}`}
      >
{(() => {
        const inner = cfg.type === "image" && cfg.src ? (
          <Image
            src={cfg.src}
            alt={cfg.key}
            width={cfg.size.width as number}
            height={cfg.size.height as number}
            className="object-contain pointer-events-none select-none"
          />
        ) : (
          <div className="p-2">
            <p className="text-xl font-bold text-black whitespace-pre-line">
              {cfg.text}
            </p>
          </div>
        );

        const href = linkMap[cfg.key];
        return href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-full"
          >
            {inner}
          </a>
        ) : (
          inner
        );
      })()}
      </DraggableWindow>
    </motion.div>
  );
}

export default function Home() {
  const [showHelp, setShowHelp] = useState(true);
  const [selectedOption, setSelectedOption] = useState<number>(-1);
  const [happenedMode, setHappenedMode] = useState(false);
  const [hoveredHappened, setHoveredHappened] = useState<number | null>(null);
  const [helpAnswer, setHelpAnswer] = useState("");
  // Z-index for help window
  const [zCounter, setZCounter] = useState(1);
  const [helpZIndex, setHelpZIndex] = useState(zCounter + 1);
  // State for the current happened scenario
  const [happenedScenario, setHappenedScenario] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<"health" | "education" | "entertainment" | null>(null);

  useEffect(() => {
    // Prefetch JS modules
    import('../../data/healthContent');
    import('../../data/educationContent');
    import('../../data/entertainmentContent');

    // Flatten keys for each category
    const allHealthWindowKeys = Object.values(optionWindows).flat();
    const allEducationOptionKeys = Object.values(educationOptionWindows).flat();
    const allEntertainmentOptionKeys = Object.values(entertainmentOptionWindows).flat();

    const nonHappenedKeys = {
      health: allHealthWindowKeys,
      education: allEducationOptionKeys,
      entertainment: allEntertainmentOptionKeys,
    } as const;

    // Preload images for each category
    (['health','education','entertainment'] as const).forEach(cat => {
      const keys = nonHappenedKeys[cat];
      windows
        .filter(w => w.type === 'image' && keys.includes(w.key))
        .forEach(w => {
          const img = new window.Image();
          img.src = w.src!;
        });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Determine if user has confirmed "yes"
  const page2Active = helpAnswer.trim().toLowerCase() === "yes";

  // Help intro typing effect
  const helpIntroText = `This resource has been developed by SIN Consulting Ltd. to help you adjust to everyday life in the year 2034.

In 2028, as part of Employee Upskilling Initiative (#1967), you underwent Brain-Computer Interface (BCI) integration surgery. Unfortunately, unforeseen complications arose during the procedure, requiring your placement into an Extended Aging Freeze™ pod.

Your employer has generously extended credit coverage for your pod usage and granted you access to this resource, enabling you to catch up with developments and societal changes since your surgery.

Important Disclaimer:
By proceeding to use this website, you agree to waive any rights to participate in the ongoing class-action lawsuit against Employer #451 regarding alleged negligence, withholding of critical information, or related claims associated with the Employee Upskilling Initiative.

Type yes to confirm and continue.`;
  const [helpDisplayedText, setHelpDisplayedText] = useState("");
  const [helpTypingIdx, setHelpTypingIdx] = useState(0);

  const page2IntroText = `Help Guide – Page 2

You can now explore the following content categories to familiarize yourself with key changes since 2028:

• Health
• Education
• Entertainment

To load a category, hover over the File menu, select Add, then choose your desired category.`;
  const [page2DisplayedText, setPage2DisplayedText] = useState("");
  const [page2TypingIdx, setPage2TypingIdx] = useState(0);

  const loadedHelp = showHelp && page2Active;

  // --- loadedIntroText/loadedDisplayedText removed, no longer needed for help flow ---

  useEffect(() => {
    if (showHelp && helpTypingIdx < helpIntroText.length) {
      const timeout = setTimeout(() => {
        setHelpDisplayedText(helpIntroText.slice(0, helpTypingIdx + 1));
        setHelpTypingIdx(helpTypingIdx + 1);
      }, 15);
      return () => clearTimeout(timeout);
    }
  }, [helpTypingIdx, showHelp, helpIntroText]);

  useEffect(() => {
    if (page2Active && page2TypingIdx < page2IntroText.length) {
      const timeout = setTimeout(() => {
        setPage2DisplayedText(page2IntroText.slice(0, page2TypingIdx + 1));
        setPage2TypingIdx(page2TypingIdx + 1);
      }, 15);
      return () => clearTimeout(timeout);
    }
  }, [page2TypingIdx, page2Active, page2IntroText]);

  // Easter egg: when the user types “nis” (any casing), open the Next Innovation Scholars page
  useEffect(() => {
    if (helpAnswer.trim().toLowerCase() === "nis") {
      window.open(
        "https://www.uc.edu/about/president/presidential-awards/next-innovation-scholars.html",
        "_blank"
      );
    }
  }, [helpAnswer]);

  // Handler to be called from MacMenuBar
  const handleAddHealth = () => {
    setShowHelp(false);
    setSelectedCategory("health");
    setSelectedOption(-1);
    setHappenedMode(false);
    setHoveredHappened(null);
  };
  const handleAddEducation = () => {
    setShowHelp(false);
    setSelectedCategory("education");
    setSelectedOption(-1);
    setHappenedMode(false);
    setHoveredHappened(null);
  };
  const handleAddEntertainment = () => {
    setShowHelp(false);
    setSelectedCategory("entertainment");
    setSelectedOption(-1);
    setHappenedMode(false);
    setHoveredHappened(null);
  };

  // Bring-to-front logic for windows (placeholder for real logic)
  const bringToFront = () => {
    const newZ = zCounter + 1;
    setZCounter(newZ);
    // (You would set the z-index for the window with id here)
  };

  useEffect(() => {
    if (showHelp) {
      setZCounter(prev => {
        const newZ = prev + 1;
        setHelpZIndex(newZ);
        return newZ;
      });
    }
  }, [showHelp]);

  // Option highlight mapping and selected
  const optionHighlights: Record<number, string[]> = {
    0: ['text1','text3','text5','text4'],
    1: ['text6','text7','text8','text9', 'text10'],
    2: ['text11','humanoid-text','techlimbs-text','body-computer-text','aging-text'],
  };
  // Highlights for Education scenario text draggables
  const educationOptionHighlights: Record<number, string[]> = {
    0: ["ide1-text", "ide2-text", "ide3-text", "ide4-text"],
    1: ["arms1-text", "arms2-text", "arms3-text", "arms4-text"],
    2: ["cliff1-text", "cliff2-text", "cliff3-text", "cliff4-text"],
  };
  // Highlights for Entertainment scenario text draggables
  const entertainmentOptionHighlights: Record<number, string[]> = {
    0: ["fifth1-text", "fifth2-text", "fifth3-text", "fifth4-text"],
    1: ["ai1-text", "ai2-text", "ai3-text", "ai4-text"],
    2: ["king1-text", "king2-text", "king3-text", "king4-text"],
  };
  const highlightedKeys = selectedCategory === "education"
    ? (educationOptionHighlights[selectedOption] || [])
    : selectedCategory === "entertainment"
    ? (entertainmentOptionHighlights[selectedOption] || [])
    : (optionHighlights[selectedOption] || []);

  // Map option index to window keys to show
  const optionWindows: Record<number, string[]> = {
    0: ['techanswers', 'sensors', 'surgery', 'text1', 'text3', 'text4', 'text5', 'info'],
    1: ['text6','text7','text8','text9', 'text10','pip','grocery','law','overreach','money'],
    2: ['text11','humanoid-text','techlimbs-text','body-computer-text','aging-text','celebrity','humanoid-img','techlimbs-img','body-computer-img','aging-img'],
  };

  // for Education category
  const educationOptionWindows: Record<number, string[]> = {
    0: ["ide1", "ide1-text", "ide2", "ide2-text", "ide3", "ide3-text", "ide4", "ide4-text"],
    1: [
      "arms1", "arms1-text",
      "arms2", "arms2-text",
      "arms3", "arms3-text",
      "arms4", "arms4-text"
    ],
    2: [
      "cliff1",   "cliff1-text",
      "cliff2",   "cliff2-text",
      "cliff3",   "cliff3-text",
      "cliff4",   "cliff4-text"
    ],
  };
  // for Entertainment category
  const entertainmentOptionWindows: Record<number, string[]> = {
    0: ["fifth1", "fifth1-text", "fifth2", "fifth2-text", "fifth3", "fifth3-text", "fifth4", "fifth4-text"],
    1: ["ai1", "ai1-text", "ai2", "ai2-text", "ai3", "ai3-text", "ai4", "ai4-text"],
    2: ["king1", "king1-text", "king2", "king2-text", "king3", "king3-text", "king4", "king4-text"],
  };

  // Flattened lists of window keys for each primary category
  const allHealthWindowKeys = Object.values(optionWindows).flat();
  const allEducationOptionKeys = Object.values(educationOptionWindows).flat();
  const allEntertainmentOptionKeys = Object.values(entertainmentOptionWindows).flat();



  // Draggables per happened-scenario and per option index
  const scenarioDraggables: Record<number, Record<number, string[]>> = {
    // Scenario 0: Dr. Me
    0: {
      0: ["wearable1","wearable2","wearable3"],
      1: ["healthassist1","healthassist2","healthassist3"],
      2: ["marketplace1","marketplace2","marketplace3"],
      3: ["hollistic1","hollistic2","hollistic3"],
      4: [],  // “Return to Health Start” shows no draggables
    },
    // Scenario 1: Profit Over Patient
    1: {
      0: ["diy1","diy2","diy3"],
      1: ["debt1","debt2","debt3"],
      2: ["crypto1","crypto2","crypto3"],
      3: ["price1","price2","price3"],
      4: [],  // Return option
    },
    // Scenario 2: Enhancement (Whole New World)
    2: {
      0: ["aging1","aging2","aging3"],
      1: ["enhance1","enhance2","enhance3"],
      2: ["gene1","gene2","gene3"],
      3: ["ethics1","ethics2","ethics3"],
      4: [],             // Return to start
    },
  };

  // Draggables per education scenario and per happened-option index
  const educationScenarioDraggables: Record<number, Record<number, string[]>> = {
    0: {
      0: ["culture1", "culture2", "culture3", "culture4"],
      1: ["home1", "home2", "home3", "home4"],
      2: ["censor1", "censor2", "censor3", "censor4"],
      3: ["values1", "values2", "values3", "values4"],
      4: [],  // Return to Education Start
    },
    1: {
      0: ["red1", "red2", "red3", "red4"],
      1: ["pay1", "pay2", "pay3", "pay4"],
      2: ["cred1", "cred2", "cred3", "cred4"],
      3: ["test1", "test2", "test3", "test4"],
      4: [],  // Return to Education Start
    },
    2: {
      0: ["demo1", "demo2", "demo3", "demo4"],
      1: ["tuition1", "tuition2", "tuition3", "tuition4"],
      2: ["corp1", "corp2", "corp3", "corp4"],
      3: ["altfin1", "altfin2", "altfin3", "altfin4"],
      4: [],  // Return to Education Start
    },
  };

  // Draggables per entertainment scenario and per happened-option index
  const entertainmentScenarioDraggables: Record<number, Record<number, string[]>> = {
    0: { // Fifth Wall
      0: ["imm1","imm2","imm3","imm4"],
      1: ["exp1","exp2","exp3","exp4"],
      2: ["wear1","wear2","wear3","wear4"],
      3: ["fan1","fan2","fan3","fan4"],
      4: [], // Return to Entertainment Start
    },
    1: { // AI Credits Roll
      0: ["gen1","gen2","gen3","gen4"],
      1: ["cont1","cont2","cont3","cont4"],
      2: ["auto1","auto2","auto3","auto4"],
      3: ["unc1","unc2","unc3","unc4"],
      4: [],
    },
    2: { // Artists Are King
      0: ["auth1","auth2","auth3","auth4"],
      1: ["div1","div2","div3","div4"],
      2: ["ind1","ind2","ind3","ind4"],
      3: ["d21","d22","d23","d24"],
      4: [],
    },
  };

  // Flatten all scenario draggables into one list for filtering
  const allScenarioKeys = Object.values(scenarioDraggables)
    .flatMap(optMap => Object.values(optMap))
    .flat();

  // You should have happenedScenario and hoveredHappened in scope

  // Compute which draggables to show
  const activeWindows: WindowConfig[] = happenedMode
    ? (() => {
        if (selectedCategory === "education") {
          return hoveredHappened !== null
            ? windows.filter(w =>
                educationScenarioDraggables[happenedScenario][hoveredHappened!]?.includes(w.key)
              )
            : [];
        } else if (selectedCategory === "entertainment") {
          return hoveredHappened !== null
            ? windows.filter(w =>
                entertainmentScenarioDraggables[happenedScenario][hoveredHappened!]?.includes(w.key)
              )
            : [];
        } else {
          // health
          return hoveredHappened !== null
            ? windows.filter(w =>
                scenarioDraggables[happenedScenario][hoveredHappened!]?.includes(w.key)
              )
            : [];
        }
      })()
    : (() => {
        if (selectedCategory === "education") {
          // Before any option is selected, show all education draggables
          if (selectedOption < 0) {
            return windows.filter(w =>
              allEducationOptionKeys.includes(w.key)
            );
          }
          // Once an option is selected, show only that option's draggables
          return educationOptionWindows[selectedOption]
            ? windows.filter(w =>
                educationOptionWindows[selectedOption].includes(w.key)
              )
            : [];
        } else if (selectedCategory === "health") {
          // Health category
          if (selectedOption >= 0 && selectedOption in optionWindows) {
            return windows.filter(w =>
              optionWindows[selectedOption].includes(w.key)
            );
          }
          // before option selected, show all Health draggables
          return windows.filter(w =>
            allHealthWindowKeys.includes(w.key)
          );
        } else if (selectedCategory === "entertainment") {
          // Entertainment: show draggables for entertainment category
          // Before any option selected, show all Entertainment draggables
          if (selectedOption < 0) {
            return windows.filter(w =>
              allEntertainmentOptionKeys.includes(w.key)
            );
          }
          // Once an option is selected, show only that option's draggables
          return entertainmentOptionWindows[selectedOption]
            ? windows.filter(w =>
                entertainmentOptionWindows[selectedOption].includes(w.key)
              )
            : [];
        } else {
          // other categories (fallback)
          return windows.filter(w =>
            !allScenarioKeys.includes(w.key) &&
            !allEducationOptionKeys.includes(w.key) &&
            !allHealthWindowKeys.includes(w.key) &&
            !allEntertainmentOptionKeys.includes(w.key)
          );
        }
      })();

  return (
    <>
      <MacMenuBar
        onAddHealth={handleAddHealth}
        onAddEducation={handleAddEducation}
        onAddEntertainment={handleAddEntertainment}
        disableFile={!page2Active}
      />
      <AnimatePresence mode="wait" initial={false}>
        {loadedHelp ? (
          <motion.div
            key="helpLoaded"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <DraggableWindow
              id="help"
              initialPos={{ x: 760, y: 354.5 }}
              width={600}
              height={400}
              className="bg-white text-black shadow-md"
              initialZIndex={helpZIndex}
            >
              {/* Header bar */}
              <div className="flex items-center px-3 py-2 bg-white border-b border-gray-300 rounded-t-lg">
                <div className="flex space-x-1">
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                </div>
                <h1 className="ml-3 text-lg font-semibold">Help Guide – Page 2</h1>
                <span className="ml-auto text-sm text-gray-500">April 28, 2025 at 9:07 PM</span>
              </div>
              <div className="px-4 py-3 mb-4 font-mono text-sm text-gray-800 bg-blue-50 border-l-4 border-blue-400 rounded-md italic shadow-sm">
                Calibrate: Press <kbd>⌘</kbd>/<kbd>Ctrl</kbd> <kbd>+</kbd>/<kbd>-</kbd> to zoom in and out until this window is centered on your screen.
              </div>
              <div className="px-4 py-3 font-mono whitespace-pre-wrap">
                {page2DisplayedText}
              </div>
            </DraggableWindow>
          </motion.div>
        ) : showHelp ? (
          <motion.div
            key={helpAnswer.trim().toLowerCase() === "yes" ? "help2" : "help1"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <DraggableWindow
              id="help"
              initialPos={
                helpAnswer.trim().toLowerCase() === "yes"
                  ? { x: 760, y: 354.5 }
                  : { x: 694, y: 299 }
              }
              width={helpAnswer.trim().toLowerCase() === "yes" ? 600 : 800}
              height={helpAnswer.trim().toLowerCase() === "yes" ? 400 : 600}
              className="bg-white text-black shadow-md"
              initialZIndex={helpZIndex}
            >
              {/* Header bar */}
              <div className="flex items-center px-3 py-2 bg-white border-b border-gray-300 rounded-t-lg">
                {/* Traffic lights */}
                <div className="flex space-x-1">
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                </div>
                {/* Title */}
                <h1 className="ml-3 text-lg font-semibold">Welcome User</h1>
                {/* Timestamp */}
                <span className="ml-auto text-sm text-gray-500">April 2, 2034 at 8:24 PM</span>
              </div>
              {helpAnswer.trim().toLowerCase() === "yes" ? (
                <div className="px-4 py-3 font-mono whitespace-pre-wrap">
                  {page2DisplayedText}
                </div>
              ) : (
                <div className="px-4 py-3 font-mono whitespace-pre-wrap">
                  {helpDisplayedText}
                </div>
              )}
              {/* input prompt for page1 only */}
              {!(helpAnswer.trim().toLowerCase() === "yes") && helpTypingIdx >= helpIntroText.length && (
                <div className="mt-4 px-4 pb-3">
                  <div className="flex items-center font-mono">
                    <span className="mr-2">{">"}</span>
                    <input
                      type="text"
                      placeholder="Type your response..."
                      value={helpAnswer}
                      onChange={(e) => setHelpAnswer(e.target.value)}
                      maxLength={3}
                      className="flex-1 bg-transparent border-b border-gray-300 focus:outline-none focus:border-gray-500"
                    />
                  </div>
                </div>
              )}
            </DraggableWindow>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {selectedCategory && (
          <motion.div
            key={`text-editor-${selectedCategory}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <TextEditWindow
              content={
                selectedCategory === "health"
                  ? healthContent
                  : selectedCategory === "education"
                  ? educationContent
                  : entertainmentContent
              }
              initialPos={{ x: 694, y: 299 }}
              initialZIndex={1}
              onOptionSelect={setSelectedOption}
              onHappenedModeChange={setHappenedMode}
              onHappenedHover={setHoveredHappened}
              onHappenedScenarioChange={setHappenedScenario}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedCategory && activeWindows.map(cfg => (
          <MotionWindow
            key={cfg.key}
            cfg={cfg}
            bringToFront={bringToFront}
            highlighted={highlightedKeys.includes(cfg.key)}
          />
        ))}
      </AnimatePresence>
    </>
  );
}