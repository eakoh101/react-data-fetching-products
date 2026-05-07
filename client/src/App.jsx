// import "./App.css";
// import { useState, useEffect } from "react";
// import axios from "axios";

// function App() {
//   const [products, setProducts] = useState([]);

//   // 1. ดึงข้อมูลจาก Server เมื่อ Component เริ่มทำงาน
//   useEffect(() => {
//     getProducts();
//   }, []);

//   const getProducts = async () => {
//     console.log("Such" );

//     try {
//       const response = await axios.get(`http://localhost:4001/products`);
//       // สังเกตว่าโครงสร้างข้อมูลตาม Test Case คือ { data: { data: products } }
//       setProducts(response.data.data);
//     } catch (error) {
//       console.error("Error fetching products:", error);

//     }
//   };

//   // 2. ฟังก์ชันสำหรับลบสินค้า
//   const deleteProduct = async (id) => {
//     try {
//       await axios.delete(`http://localhost:4001/products/${id}`);
//       // เมื่อลบที่ Server สำเร็จ ให้ Update State ในเครื่องทันที
//       const newProducts = products.filter((product) => product.id !== id);
//       setProducts(newProducts);
//     } catch (error) {
//       console.error("Error deleting product:", error);
//     }
//   };

//   return (
//     <div className="App">
//       <div className="app-wrapper">
//         <h1 className="app-title">Products</h1>
//       </div>
//       <div className="product-list">
//         {products.map((product) => (
//           <div className="product" key={product.id}>
//             <div className="product-preview">
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 width="350"
//                 height="350"
//               />
//             </div>
//             <div className="product-detail">
//               {/* เขียนข้อความให้ตรงกับที่ Test Case คาดหวัง */}
//               <h3>Product name: {product.name}</h3>
//               <h3>Product price: {product.price}</h3>
//               <h3>Product description: {product.description}</h3>
//             </div>

//             <button
//               className="delete-button"
//               onClick={() => deleteProduct(product.id)}
//             >
//               x
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;

import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  // สร้าง State สำหรับจัดการสถานะการดึงข้อมูล
  const [status, setStatus] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    // 1. ก่อนเริ่มดึงข้อมูล ให้ตั้งสถานะเป็น loading
    setStatus("loading");

    try {
      const response = await axios.get(`http://localhost:4001/products`);
      setProducts(response.data.data);
      // 2. เมื่อดึงข้อมูลสำเร็จ ให้ตั้งสถานะเป็น complete
      setStatus("complete");
    } catch (error) {
      console.error("Error fetching products:", error);
      // 3. เมื่อเกิด Error ให้ตั้งสถานะเป็น failed
      setStatus("failed");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/products/${id}`);
      const newProducts = products.filter((product) => product.id !== id);
      setProducts(newProducts);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>

      {/* 4. ส่วนการเช็คสถานะเพื่อ Render UI */}
      <div className="product-list">
        {status === "loading" && <h1>Loading...</h1>}
        {status === "failed" && <h1>Fetching Error...</h1>}

        {/* แสดงข้อมูลสินค้าเฉพาะเมื่อสถานะเป็น complete */}
        {status === "complete" &&
          products.map((product) => (
            <div className="product" key={product.id}>
              <div className="product-preview">
                <img
                  src={product.image}
                  alt={product.name}
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                <h3>Product name: {product.name}</h3>
                <h3>Product price: {product.price}</h3>
                <h3>Product description: {product.description}</h3>
              </div>

              <button
                className="delete-button"
                onClick={() => deleteProduct(product.id)}
              >
                x
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
