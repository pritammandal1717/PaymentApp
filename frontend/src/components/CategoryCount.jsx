import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

function CategoryCount({refresh, setRefresh}) {
    const [categoryCount, setCategoryCount] = useState({});
    const navigate = useNavigate()
    useEffect(() => {
        (async () => {
            const response = await axios.get("http://localhost:3000/api/v1/user/category-count", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }).catch(() => {
                navigate("/")
            })
            setCategoryCount(response.data)
            setRefresh(r => !r)
        })()
    }, [refresh])
    const count = {
        family: categoryCount.family ? categoryCount.family.length : 0,
        friend: categoryCount.friend ? categoryCount.friend.length : 0,
        business: categoryCount.business ? categoryCount.business.length : 0,
        other: categoryCount.others ? categoryCount.others.length : 0,
    }
    return (
        <>
            <div className="flex flex-row justify-between p-5 mt-10 border-t-2 rounded-md shadow-md">
                <div className="px-8 py-3 bg-cyan-800 text-slate-100 rounded-md m-2 font-mono">Family({count.family})</div>
                <div className="px-8 py-3 bg-cyan-800 text-slate-100 rounded-md m-2 font-mono">Friend({count.friend})</div>
                <div className="px-8 py-3 bg-cyan-800 text-slate-100 rounded-md m-2 font-mono">Business({count.business})</div>
                <div className="px-8 py-3 bg-cyan-800 text-slate-100 rounded-md m-2 font-mono">Others({count.other})</div>
            </div>
        </>
    )
}

export default CategoryCount