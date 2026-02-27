const Footer = () => {
      return (
        <footer className="bg-emerald-50 py-6 mt-12">
          <div className="container mx-auto text-center text-gray-600">
            <p>উপাত্তের উৎস: <a href="https://alquran.cloud" target="_blank" rel="noopener" className="text-primary underline">AlQuran Cloud</a></p>
            <p className="text-sm mt-2">© {new Date().getFullYear()} Noor – Bangla Quran Ayat Finder</p>
          </div>
        </footer>
      )
    }
    
    export default Footer