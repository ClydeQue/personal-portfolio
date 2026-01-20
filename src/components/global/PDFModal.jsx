import React, { useState, useEffect, useRef } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

/**
 * PDF Modal Component
 * Displays a PDF in a fullscreen modal popup with all pages scrollable
 */
const PDFModal = ({ isOpen, onClose, pdfUrl, title = 'Document' }) => {
  const [numPages, setNumPages] = useState(null)
  const [scale, setScale] = useState(1.0)
  const [isLoading, setIsLoading] = useState(true)
  const scrollContainerRef = useRef(null)

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
    setIsLoading(false)
  }

  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 2.5))
  }

  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5))
  }

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    }
    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [isOpen])

  // Prevent scroll from propagating to body
  const handleWheel = (e) => {
    e.stopPropagation()
  }

  const handleTouchMove = (e) => {
    e.stopPropagation()
  }

  if (!isOpen) return null

  // Detect if mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      onClick={onClose}
      onWheel={handleWheel}
      onTouchMove={handleTouchMove}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 md:bg-black/80 backdrop-blur-sm" />
      
      {/* Modal Content - Full screen on mobile, centered modal on desktop */}
      <div 
        className="relative z-10 bg-white md:rounded-2xl shadow-2xl w-full h-full md:w-[95vw] md:h-[95vh] md:max-w-[900px] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Simplified on mobile */}
        <div className="flex-shrink-0 flex items-center justify-between px-4 py-3 md:px-6 md:py-4 border-b border-gray-200 bg-gray-50 md:rounded-t-2xl safe-area-top">
          {/* Close button on left for mobile (thumb-friendly) */}
          <button 
            onClick={onClose}
            className="md:hidden p-2 -ml-2 active:bg-gray-200 rounded-full transition-colors cursor-pointer"
            title="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <h3 className="text-sm md:text-lg font-semibold text-gray-800 font-[gotham] truncate flex-1 text-center md:text-left md:flex-none">
            {isMobile ? 'CV' : title}
          </h3>
          
          {/* Controls - Minimal on mobile */}
          <div className="flex items-center gap-1 md:gap-4">
            {/* Zoom Controls - Hidden on mobile for cleaner UI, use pinch-to-zoom instead */}
            <div className="hidden md:flex items-center gap-2">
              <button 
                onClick={zoomOut}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
                title="Zoom Out"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                </svg>
              </button>
              <span className="text-sm text-gray-600 min-w-[60px] text-center">{Math.round(scale * 100)}%</span>
              <button 
                onClick={zoomIn}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
                title="Zoom In"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
              </button>
            </div>

            {/* Download Button - Icon only on mobile */}
            <a 
              href={pdfUrl} 
              download
              className="flex items-center justify-center gap-2 p-2 md:px-4 md:py-2 bg-[#1B374B] text-white rounded-full md:rounded-lg hover:bg-[#143E5B] active:scale-95 transition-all text-sm font-medium cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-4 md:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span className="hidden md:inline">Download</span>
            </a>

            {/* Close Button - Desktop only (mobile has back arrow) */}
            <button 
              onClick={onClose}
              className="hidden md:block p-2 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
              title="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* PDF Content - Scrollable container for all pages */}
        <div 
          ref={scrollContainerRef}
          className="flex-1 bg-gray-100 md:bg-gray-200"
          style={{ 
            overflowY: 'scroll',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            scrollBehavior: 'smooth',
            position: 'relative',
            touchAction: 'pan-y pinch-zoom'
          }}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          <div className="min-h-full p-2 md:p-4 flex justify-center">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 border-4 border-[#1B374B] border-t-transparent rounded-full animate-spin" />
                  <span className="text-gray-600 font-medium text-sm">Loading CV...</span>
                </div>
              </div>
            )}
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={null}
              className="flex flex-col items-center gap-2 md:gap-4"
            >
              {/* Render ALL pages for continuous scrolling */}
              {numPages && Array.from(new Array(numPages), (_, index) => (
                <Page 
                  key={`page_${index + 1}`}
                  pageNumber={index + 1} 
                  scale={isMobile ? 0.6 : scale}
                  width={isMobile ? window.innerWidth - 16 : undefined}
                  renderTextLayer={!isMobile}
                  renderAnnotationLayer={!isMobile}
                  className="shadow-lg bg-white rounded-sm md:rounded-none"
                />
              ))}
            </Document>
          </div>
        </div>

        {/* Footer - Simplified on mobile */}
        {numPages && (
          <div className="flex-shrink-0 flex items-center justify-between md:justify-center px-4 py-2 md:py-2 border-t border-gray-200 bg-gray-50 md:rounded-b-2xl safe-area-bottom">
            <span className="text-xs text-gray-500">
              {numPages} {numPages === 1 ? 'page' : 'pages'}
            </span>
            {/* Mobile zoom hint */}
            <span className="text-xs text-gray-400 md:hidden">
              Pinch to zoom
            </span>
            <span className="hidden md:inline text-sm text-gray-500 ml-1">
              • Scroll to view
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default PDFModal
