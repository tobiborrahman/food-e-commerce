const HeroSection:  React.FC = () => {
	return (
		<section className="bg-[radial-gradient(ellipse_at_top_left,_rgba(249,241,235,1),_rgba(247,247,255,1)_40%,_rgba(231,244,248,1)_80%,_rgba(245,238,249,1))]">
			<div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 lg:px-0 max-w-[1200px] mx-auto py-20 min-h-[400px]">
				{/* Left Content */}
				<div className="text-center md:text-left">
					<h1 className="text-3xl md:text-4xl font-semibold text-[#212121] leading-snug">
						<span className="text-red-600 font-bold">
							Fresh groceries
						</span>{' '}
						delivered in 60–90 minutes
					</h1>

					<p className="mt-4 text-gray-500 font-medium">
						Handpicked quality • Best prices • Same-day delivery
					</p>

					<button
						className="mt-8 bg-red-600 text-white px-6 py-2.5 rounded-md shadow-[0_3px_0_0_#f7b733] hover:bg-red-700 transition-all"
						aria-label="Shop Now"
					>
						Shop Now
					</button>
				</div>

				{/* Right Image */}
				<div className="w-full md:w-[480px] mt-10 md:mt-0">
					<img
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBuq0CULEoxWu_1ZiE6yALReEkEAuybxlnGw&s"
						alt="Groceries"
						className="w-full h-auto object-cover rounded-lg shadow-lg"
					/>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
