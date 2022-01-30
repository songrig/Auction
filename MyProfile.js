import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { setUser } from '../../Redux/Slicder';
import NavigationBar from "../NavigationBar";

import { collection, getDoc, getDocs, query, where } from 'firebase/firestore/lite';
import { db, getUsers } from '../../firebais/fiarebaisForBuyers';
import MyPurchase from './MyPurchase';
import { Input } from '@mui/material';
import UploadImgForUser from './UploadImgForUSer';
import MySales from './MySales';


export default function MediaCard() {

    let { uid, email, name, surName, referance,myBougthItems,userImg} = useSelector((state) => state.auction.user);
    const[myPurchaseItems,setMyPurchaseItems] = React.useState([])


    const fetchBlogs = React.useCallback(async (db, e) => {
        const response = collection(db, 'AuctionItems');
        const q = query(response, where("owner", "==", e))
        const data = await getDocs(q);
        const auctionAllItems = data.docs.map(item => {
            return item.data()
        })
        const d = await Promise.all(auctionAllItems.map(async (item) => {
            const u = await getDoc(item.buyerUser)
            return {
                u: u.data(),
                ...item
            }
        }))

        setMyPurchaseItems(d);
    }, [])


    React.useEffect(() => {
        if (email) {
            fetchBlogs(db, email)
        }
    }, [email, fetchBlogs])

    return (
        <div>

            <NavigationBar />
         <div className='my-profile-content'>
         <Card sx={{ maxWidth: 345 }}>
                <div>
                    <CardMedia 
                        style={{
                            borderRadius: "50%"
                        }}
                        component="img"
                        image={userImg || "https://firebasestorage.googleapis.com/v0/b/auction-44e7c.appspot.com/o/usersImgs%2FuserImg.png?alt=media&token=3fe49da6-c47c-45b6-a239-2fffe2f5511a"}
                        alt="User"
                    />
                    <UploadImgForUser />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">

                        {name + " " + surName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        You have {myPurchaseItems?.length} purchase and {myBougthItems?.length} sales
                    </Typography>
                    </CardContent>
                </div>
            </Card>
            <div className='my-profile-content_item'>
                <div>
                    <MyPurchase myPurchaseItems={myPurchaseItems}/>
                </div>
                <div>
                    <MySales myBougthItems={myBougthItems} />
                </div>
            </div>
         </div>
      
        </div>
    );
}