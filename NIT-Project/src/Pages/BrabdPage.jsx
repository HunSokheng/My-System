import { useState } from "react";
import {Button, Input, Space} from "antd";

function BrandPage() {
    const [test, setTest] = useState("")
    return(
        <div className="container">
            <div style={{display:"flex",justifyContent:"space-between"}}>
                <Space>
                    <h3>BrandPage</h3>
                    <Input onChange={e => setTest(e.target.value)} value={test} />
                </Space>
                <Button type="primary" onClick={() => setTest("test")}>Test</Button>
            </div>
        </div>

    );
}

export default BrandPage;