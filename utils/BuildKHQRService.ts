 function crc16(payload : any) {
    let crc = 0xffff;
  
    for (let i = 0; i < payload.length; i++) {
      crc ^= payload.charCodeAt(i) << 8;
      for (let j = 0; j < 8; j++) {
        crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
      }
    }
  
    return (crc & 0xffff).toString(16).toUpperCase().padStart(4, "0");
  }


  function emv(tag : string, value : string) {
    const length = value.length.toString().padStart(2, "0");
    return tag + length + value;
  }


  export default function buildKHQR(amount : string) {
    let payload = "";
  
    // Header
    payload += emv("00", "01");
    payload += emv("01", "12"); // dynamic
  
    // 🔥 Merchant Account Info (NESTED)
    let merchant29 = "";
    merchant29 += emv("00", "abaakhppxxx@abaa");
    merchant29 += emv("01", "187727254");
    merchant29 += emv("02", "ABA Bank");
    merchant29 += emv("40", "abaP2P");
  
    payload += emv("29", merchant29);
  
    // Merchant category
    payload += emv("52", "0000");
  
    // Currency
    payload += emv("53", "116");
  
    // 🔴 AMOUNT (THIS IS SAFE TO CHANGE)
    payload += emv("54", amount.toString());
  
    // Country
    payload += emv("58", "KH");
  
    // Merchant name
    payload += emv("59", "SENG KIMNAM");
  
    // City
    payload += emv("60", "Phnom Penh");
  
    // ✅ Additional data (reference)
    let additional62 = "";
    additional62 += emv("01", Date.now().toString());
  
    payload += emv("62", additional62);
  
    // CRC
    payload += "6304";
    payload += crc16(payload);
  
    return payload;
  }
  


