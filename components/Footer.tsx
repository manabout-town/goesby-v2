export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] mt-24">
      <div className="mx-auto max-w-[1200px] px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="font-[family-name:var(--font-bodoni)] text-lg tracking-wide">GOESBY</p>
        <div className="flex items-center gap-6">
          <a
            href="https://www.instagram.com/goseby_official/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-[family-name:var(--font-inter)] uppercase tracking-[0.1em] text-[var(--text-sub)] hover:text-[var(--text)] transition-colors"
          >
            Instagram
          </a>
          <a
            href="https://pf.kakao.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-[family-name:var(--font-inter)] uppercase tracking-[0.1em] text-[var(--text-sub)] hover:text-[var(--text)] transition-colors"
          >
            KakaoTalk
          </a>
        </div>
        <p className="text-[11px] text-[var(--text-sub)]">
          © {new Date().getFullYear()} GOESBY
        </p>
      </div>
    </footer>
  )
}
