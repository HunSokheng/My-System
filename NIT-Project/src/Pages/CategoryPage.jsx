import {useEffect, useState} from "react";
import {request} from "../util/request";
import {Button} from "antd";

function CategoryPage() {
    /**
     Loading
     message Success | Error
     confirm delete
     **/

    const [list, setList] = useState([]);
    useEffect(() => {
         fetchListCategory().catch(console.error);
    }, []);

    const fetchListCategory = async () => {
        const res = await request("categories", "GET");
        console.log(res);
        if(res.list) {
            setList(res.list);
        }
    };

    return (
        <div>
            <div style = {{display: "flex",justifyContent: "space-between"}}>
                <p>Category:{list.length}</p>
                <Button type="primary">New Category</Button>
            </div>
        </div>
    )
}

export default CategoryPage;