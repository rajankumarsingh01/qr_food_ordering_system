import QRCode from "qrcode";

const generateQRCode = async (
  qrValue
) => {
  const qrBuffer =
    await QRCode.toBuffer(qrValue, {
      errorCorrectionLevel: "H",
      margin: 2,
      width: 500,
    });

  return qrBuffer;
};

export default generateQRCode;