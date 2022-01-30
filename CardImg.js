import React, {useCallback, useEffect, useState} from "react"
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { Button, ButtonGroup } from '@mui/material';
import { db } from "../../firebais/fiarebaisForBuyers";
import { getFirestore, getDocs,collection, where, query } from "firebase/firestore/lite"
import { useNavigate } from "react-router-dom";

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';





export default function TitlebarImageList({setItem}) {

  // const [data, setData] = useState([...itemData])
  const [dataClone, setDataClone] = useState([])
  const [auctionItems,setAuctionItems]=useState([])
  const [activeButton, setActiveButton] = useState('all')
  const navigate = useNavigate()


  const fetchBlogs= useCallback(async function fetchBlogs (db){
    const response=collection(db,'AuctionItems');
    const q = query(response, where("date", ">=", new Date(new Date()-600000)))
    const data = await getDocs(q);
    const auctionAllItems = data.docs.map(item => {
      return item.data()
    })
    setAuctionItems(auctionAllItems)
    setDataClone(auctionAllItems)

  })

  useEffect(() => {
    fetchBlogs(db);
  }, [])

  useEffect(()=>{
    const int = setInterval(()=>fetchBlogs(db),20000)
    return ()=> clearInterval(int)
   },[])

  const filter = (type) => {
    let dataClone = []
    if(type === 'all') {
      dataClone = auctionItems
    } else {
      dataClone = auctionItems.filter((el) => el.type === type)
    }
    setDataClone(dataClone)
  }



  const live = (item)=> (new Date()-item?.date.toDate() >= 0 && new Date()-item?.date.toDate() <= 600000)


  return (<div>

        <ButtonGroup size='large' variant="contained" aria-label="outlined primary button group" className="filter-btn">
          <Button variant={activeButton === 'all' ? 'contained' : 'outlined'} value="all" cols={3} onClick={(e) => {
          filter(e.target.value)
          setActiveButton(e.target.value)
          }} >All</Button>
          <Button variant={activeButton === 'car' ? 'contained' : 'outlined'} value="car" onClick={(e) => {
          filter(e.target.value)
          setActiveButton(e.target.value)
          }}>Cars</Button>
          <Button variant={activeButton === 'image' ? 'contained' : 'outlined'} value="image" onClick={(e) => {
          filter(e.target.value)
          setActiveButton(e.target.value)
          }}>Images</Button>
          <Button variant={activeButton === 'other' ? 'contained' : 'outlined'} value="other" onClick={(e) => {
          filter(e.target.value)
          setActiveButton(e.target.value)
          }}>Other</Button>
        </ButtonGroup>
    <ImageList cols={12}>
    {/* <ImageListItem key="Subheader" cols={12}>
      <ListSubheader component="div">{<h1 style={{alignItems: 'center',}}>All items</h1>}</ListSubheader>
    </ImageListItem> */}
      {dataClone.map((item) => (
        <ImageListItem  cols={3} key={item.img} className='image-list_item'>
          <img
          style={{
            width: "100%",
            height: "100%"
          }}
          onClick={()=>{
            setItem(item)
             navigate(`/buyPage/${item.itemName}`)
          }}
            src={item.imgUrl}
            // srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.name}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.itemName}
            subtitle={item.author}
            actionIcon={
              <div style={{
                display:"flex",
                alignItems:"center"
              }}>
              {live(item) && <h4>Live</h4>}
            <FiberManualRecordIcon  style={{ color: live(item)? 'red':"grey" }} />
            <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${item.itemName}`}
                className="info-btn"
              >
                <div className="info-block">
                <InfoIcon />
                <div className="info-block-content">
                  {item.aboutItem}
                </div>
                </div>
              </IconButton>
              </div>
      
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
    </div>
  );
}

