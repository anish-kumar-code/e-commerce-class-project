import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateInvoice = (order) => {
    const doc = new jsPDF();

    // 🔥 Title
    doc.setFontSize(18);
    doc.text("INVOICE", 14, 20);

    // 🏪 Store Info
    doc.setFontSize(10);
    doc.text("ShopKart Pvt Ltd", 14, 28);
    doc.text("Lucknow, India", 14, 34);

    // 📦 Order Info
    doc.text(`Order ID: ${order.id}`, 140, 28);
    doc.text(`Date: ${order.date}`, 140, 34);

    // 👤 Customer
    doc.text("Bill To:", 14, 45);
    doc.text(order.customer.name, 14, 50);
    doc.text(order.customer.email, 14, 55);
    doc.text(order.customer.phone, 14, 60);

    // 📍 Address
    doc.text("Shipping Address:", 14, 70);
    doc.text(order.address.line, 14, 75);
    doc.text(
        `${order.address.city}, ${order.address.state} - ${order.address.pincode}`,
        14,
        80
    );

    // 🛒 Product Table
    const tableData = order.products.map((item) => [
        item.name,
        `Rs.${item.price}`,
        item.qty,
        `Rs.${item.price * item.qty}`,
    ]);

    autoTable(doc, {
        startY: 90,
        head: [["Product", "Price", "Qty", "Total"]],
        body: tableData,
    });

    // 💰 Total
    const total = order.products.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );

    const finalY = doc.lastAutoTable.finalY + 10;

    doc.text(`Subtotal: Rs.${total}`, 140, finalY);
    doc.text(`Shipping: Rs.0`, 140, finalY + 6);
    doc.text(`Total: Rs.${total}`, 140, finalY + 12);

    // 📄 Footer
    doc.text("Thank you for your purchase!", 14, finalY + 25);

    // 📥 Save
    doc.save(`invoice_${order.id}.pdf`);
};