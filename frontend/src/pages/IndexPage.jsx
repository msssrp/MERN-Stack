import React, { useEffect, useState } from 'react'
import Post from '../components/Post'
const API_URL = import.meta.env.VITE_API_URL
const PostProps = {
  title: "ศาลสหรัฐฯ จำคุก Cloud Engineer ฐานลบ GitHub ของธนาคารนายจ้างหลังถูกไล่ออก",
  author: "lew",
  time: "on 13 December 2023 - 00:56",
  imgUrl: "https://www.blognone.com/sites/default/files/externals/d3d8e849f56deaf69a1f8db94a1db289.jpg",
  data: "ศาลสหรัฐฯ สั่งจำคุก Miklos Daniel Brody หลังเขาสารภาพว่าลบข้อมูลของธนาคาร First Republic Bank (FRB) จากความโกรธแค้นที่ถูกไล่ออกเพราะทำผิดนโยบายบริษัทBrody ทำงานใน FRB ในตำแหน่ง Cloud Engineer ทำให้มีสิทธิ์เข้าถึงข้อมูลจำนวนมาก แต่ถูกไล่ออกเนื่องจากใช้ไดร์ฟ USB ส่วนตัวที่บรรจุภาพโป๊อยู่ในคอมพิวเตอร์ของธนาคารเมื่อปี 2020 เมื่อถูกไล่ออกแล้ว เขาล็อกอินเข้าเซิร์ฟเวอร์ รันสคริปต์ลบข้อมูลในเซิร์ฟเวอร์, ลบ git log ของสคริปต์ที่ใช้รัน, ลบโค้ดของธนาคารบน GitHub, ปลอมล็อกอินเป็น Cloud Engineer คนอื่นแล้วแก้ไขคอนฟิกระบบ สุดท้ายเขาไปแจ้งความว่าโน้ตบุ๊กหาย จึงไม่สามารถคืนเครื่องให้ธนาคารได้เขายืนยันว่าบริสุทธิ์มาตลอด แม้ถูกจับกุมเมื่อปี 2021 แต่เพิ่งมารับสารภาพเมื่อเดือนเมษายนที่ผ่านมาศาลพิพากษา จำคุก 24 เดือน จ่ายค่าเสียหาย 529,266.37 ดอลลาร์ให้กับธนาคาร, และถูกคุมความประพฤติอีก 3 ปี"
}

const IndexPage = () => {
  const [postData , setPostData] = useState([])
  useEffect(()=>{
    const getPosts = async() =>{
      const resp = await fetch(`${API_URL}/posts`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        }
      })
      const respJson = await resp.json()
      if(resp.ok){
        setPostData(respJson)
      }
    }
    getPosts()
  },[])

  console.log(postData)
  return (
    <div>
      {postData.map((data)=>{
        return(
          <Post title={data.title} author={data.author} time={data.createdAt} imgUrl={data.cover} data={data.content}/>
        )
      })}
    </div>
  )
}

export default IndexPage