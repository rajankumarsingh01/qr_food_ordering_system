"use client"

import { useState, useRef } from "react"
import { QRCodeCanvas } from "qrcode.react"
import { Download, Plus, Minus, QrCode } from "lucide-react"

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"

// ── Single QR Card ─────────────────────────────────────────────────
function QRCard({ tableNumber }: { tableNumber: number }) {
  const canvasRef = useRef<HTMLDivElement>(null)
  const url = `${BASE_URL}/customer/menu?table=${tableNumber}`

  const handleDownload = () => {
    const canvas = canvasRef.current?.querySelector("canvas")
    if (!canvas) return

    const image = canvas.toDataURL("image/png")
    const link = document.createElement("a")
    link.href = image
    link.download = `table-${tableNumber}-qr.png`
    link.click()
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col items-center gap-4">
      {/* QR Code */}
      <div ref={canvasRef} className="p-3 bg-white rounded-xl border border-gray-100">
        <QRCodeCanvas
          value={url}
          size={160}
          bgColor="#ffffff"
          fgColor="#111111"
          level="H"
          imageSettings={{
            src: "/logo.png",
            x: undefined,
            y: undefined,
            height: 32,
            width: 32,
            excavate: true,
          }}
        />
      </div>

      {/* Table label */}
      <div className="text-center">
        <p className="text-lg font-bold text-gray-900">Table {tableNumber}</p>
        <p className="text-xs text-gray-400 mt-0.5 break-all max-w-[180px]">
          {url}
        </p>
      </div>

      {/* Download button */}
      <button
        onClick={handleDownload}
        className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-all active:scale-95 w-full justify-center"
      >
        <Download size={15} />
        Download PNG
      </button>
    </div>
  )
}

// ── Main Page ──────────────────────────────────────────────────────
export default function QRPage() {
  const [tableCount, setTableCount] = useState(5)

  const tables = Array.from({ length: tableCount }, (_, i) => i + 1)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">QR Code Generator</h1>
          <p className="text-sm text-gray-500 mt-1">
            Generate and download QR codes for each table
          </p>
        </div>

        {/* Table count control */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-700">Number of Tables</p>
            <p className="text-xs text-gray-400 mt-0.5">
              Adjust to match your restaurant layout
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setTableCount((c) => Math.max(1, c - 1))}
              className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition"
            >
              <Minus size={16} className="text-gray-600" />
            </button>
            <span className="text-xl font-bold text-gray-900 min-w-[32px] text-center">
              {tableCount}
            </span>
            <button
              onClick={() => setTableCount((c) => Math.min(50, c + 1))}
              className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition"
            >
              <Plus size={16} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Info banner */}
        <div className="bg-orange-50 border border-orange-100 rounded-xl px-4 py-3 flex items-start gap-3">
          <QrCode size={18} className="text-orange-500 mt-0.5 shrink-0" />
          <p className="text-xs text-orange-700">
            Each QR code links to{" "}
            <span className="font-semibold">{BASE_URL}/customer/menu?table=N</span>.
            Customer scan karke seedha menu pe aa jayenge with table number auto-set.
          </p>
        </div>

        {/* QR Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {tables.map((table) => (
            <QRCard key={table} tableNumber={table} />
          ))}
        </div>
      </div>
    </div>
  )
}