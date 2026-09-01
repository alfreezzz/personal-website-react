document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener('click', function (event) {
      event.preventDefault()

      const targetID = this.getAttribute('href')
      const targetElement = document.querySelector(targetID)

      if (targetElement) {
        const offset = 85 // Sesuaikan offset ini jika perlu
        const elementPosition =
          targetElement.getBoundingClientRect().top + window.scrollY
        const offsetPosition = elementPosition - offset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        })
      }
    })
  })

  // Typing loop animation (aman jika elemennya tidak ada)
  const typingElement = document.querySelector('.typing-loop-animation')

  if (typingElement) {
    function resetTypingAnimation() {
      typingElement.classList.remove('typing-loop-animation') // Hapus animasi
      void typingElement.offsetWidth // Paksa reflow
      typingElement.classList.add('typing-loop-animation') // Tambahkan lagi animasi
    }

    // Set perulangan animasi dengan jeda 3 detik
    setInterval(resetTypingAnimation, 7000) // 4s (durasi animasi) + 3s (jeda)
  }

  // Read more / read less
  const readMoreLinks = document.querySelectorAll('.read-more')

  readMoreLinks.forEach((link) => {
    link.addEventListener('click', function () {
      const projectId = this.getAttribute('data-id')
      const shortDescription = document.querySelector(
        `#project-description-${projectId} .short-description`
      )
      const fullDescription = document.querySelector(
        `#project-description-${projectId} .full-description`
      )

      if (!shortDescription || !fullDescription) return

      // Toggle visibility
      shortDescription.classList.toggle('hidden')
      fullDescription.classList.toggle('hidden')

      // Ubah teks Read More ke Read Less
      if (fullDescription.classList.contains('hidden')) {
        this.textContent = 'Read More'
      } else {
        this.textContent = 'Read Less'
      }
    })
  })

  // ============================================================
  // Timeline circle animation (Experience / Sertifikat)
  // ------------------------------------------------------------
  // Digeneralisasi agar mendukung banyak grup timeline sekaligus
  // (mis. dua tab: Experience & Sertifikat) tanpa bergantung pada
  // ID tunggal. Setiap grup ditandai dengan attribute [data-timeline]
  // dan berisi elemen ".timeline-line", ".timeline-circle", dan
  // ".timeline-content" di dalamnya.
  //
  // PENTING: bagian ini TIDAK PERNAH melakukan `return` yang
  // menghentikan seluruh callback DOMContentLoaded. Jika sebuah
  // grup timeline tidak ditemukan/tidak lengkap, grup itu saja yang
  // dilewati — bagian lain dari script (observer scroll-section,
  // hero animation, filter artikel) tetap berjalan normal.
  // ============================================================
  const timelineGroups = document.querySelectorAll('[data-timeline]')

  timelineGroups.forEach((group) => {
    const timelineLine = group.querySelector('.timeline-line')
    const timelineCircle = group.querySelector('.timeline-circle')
    const timelineContent = group.querySelector('.timeline-content')

    // Lewati grup ini saja kalau strukturnya tidak lengkap
    if (!timelineLine || !timelineCircle || !timelineContent) return

    function updateMeasurements() {
      const groupRect = group.getBoundingClientRect()
      const contentRect = timelineContent.getBoundingClientRect()

      const timelineStart = timelineLine.offsetTop
      const timelineEnd = timelineStart + timelineLine.offsetHeight

      return {
        containerTop: groupRect.top,
        containerHeight: groupRect.height,
        contentHeight: contentRect.height,
        timelineStart: timelineStart,
        timelineEnd: timelineEnd,
        timelineLength: timelineEnd - timelineStart,
      }
    }

    function updateCirclePosition() {
      // Jangan hitung/ubah posisi kalau grup sedang disembunyikan
      // (mis. tab yang tidak aktif -> display: none via x-show)
      if (group.offsetParent === null) return

      const measurements = updateMeasurements()
      const viewportHeight = window.innerHeight
      const viewportMidpoint = viewportHeight / 3

      if (measurements.containerTop <= viewportMidpoint) {
        const pastMidpoint = viewportMidpoint - measurements.containerTop

        let scrollProgress = Math.max(
          0,
          Math.min(1, pastMidpoint / measurements.contentHeight)
        )

        const circlePosition =
          measurements.timelineStart +
          measurements.timelineLength * scrollProgress

        timelineCircle.style.top = circlePosition + 'px'
      } else {
        timelineCircle.style.top = measurements.timelineStart + 'px'
      }

      if (
        measurements.containerTop + measurements.containerHeight <
        viewportMidpoint
      ) {
        timelineCircle.style.top = measurements.timelineEnd + 'px'
      }
    }

    window.addEventListener('scroll', updateCirclePosition)
    window.addEventListener('resize', updateCirclePosition)

    // Inisialisasi posisi awal
    updateCirclePosition()
  })

  // Observer untuk animasi fade/slide-in section (.scroll-section)
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
        }
      })
    },
    {
      threshold: 0.1,
    }
  )

  const scrollSections = document.querySelectorAll('.scroll-section')
  scrollSections.forEach((section) => {
    observer.observe(section)
  })

  // Animasi hero (aman jika elemennya tidak ada)
  const heroSection = document.getElementById('hero')

  if (heroSection) {
    const heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('hero-visible')
            heroObserver.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
      }
    )

    heroObserver.observe(heroSection)
  }

  // Filter artikel berdasarkan parameter URL
  const articles = document.querySelectorAll('[data-jenis]')
  const urlParams = new URLSearchParams(window.location.search)
  const jenisArtikel = urlParams.get('jenis_artikel')

  if (jenisArtikel) {
    articles.forEach((article) => {
      if (article.dataset.jenis !== jenisArtikel.replace('+', ' ')) {
        article.style.display = 'none'
      }
    })
  }
})