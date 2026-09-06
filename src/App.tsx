import { HashRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ScrollToTop } from './components/ScrollToTop'
import { NotFound } from './components/NotFound'
import { Debug } from './Debug'
import { Home } from './Home'
import { KitGallery } from './KitGallery'
import { PrototypeHost } from './PrototypeHost'
import { SessionProvider } from './session'

export default function App() {
  return (
    // Hash routing so deep links work on GitHub Pages without any server
    // config — you can paste someone a link straight to a prototype.
    <HashRouter>
      <ScrollToTop />
      <SessionProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/kit" element={<KitGallery />} />
            <Route path="/debug" element={<Debug />} />
            <Route path="/p/:lane/:slug/*" element={<PrototypeHost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </SessionProvider>
    </HashRouter>
  )
}
