import React from 'react'

function Footer() {
    return (
        <div className='fixed-bottom'>
            {/* 🔹 Footer */}
            <footer className="bg-primary text-white text-center py-0.5">
                <div className="container">
                    <p className="mb-0">
                        © {new Date().getFullYear()} CampusRise — Elevating Campus Talent to Careers
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default Footer
