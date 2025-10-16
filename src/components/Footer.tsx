import { FaFacebookF, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { MdOutlinePhone } from 'react-icons/md';
import { CiLocationOn, CiMail } from 'react-icons/ci';

export default function Footer() {
	return (
		<footer className="bg-white border-t border-gray-200">
			<div className="py-14 flex flex-col sm:flex-row flex-wrap justify-between items-center sm:items-start gap-10 max-w-[1200px] mx-auto px-4 lg:px-0 text-sm text-gray-600">
				<div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-3">
					<h2 className="text-[36px] font-semibold text-[#B71C1C] mb-2">
						City<span className="text-[#FFC107]">Fresh</span>
					</h2>
					<p className="flex items-center gap-2">
						<MdOutlinePhone /> +8801736547879
					</p>
					<p className="flex items-center gap-2">
						<CiLocationOn /> Dhaka, Bangladesh
					</p>
					<p className="flex items-center gap-2">
						<CiMail /> contact@cityfresh.com.bd
					</p>
				</div>

				<div className="flex flex-col items-center sm:items-start text-center sm:text-left">
					<h3 className="font-semibold mb-4 text-[#212121]">Information</h3>
					<ul className="space-y-3">
						<li className="hover:text-[#B71C1C] cursor-pointer transition">
							Shipping & Returns
						</li>
						<li className="hover:text-[#B71C1C] cursor-pointer transition">
							About Us
						</li>
						<li className="hover:text-[#B71C1C] cursor-pointer transition">
							Terms & Conditions
						</li>
					</ul>
				</div>

				<div className="flex flex-col items-center sm:items-start text-center sm:text-left">
					<h3 className="font-semibold mb-3 text-[#212121]">Follow Us</h3>
					<div className="flex justify-center sm:justify-start gap-3 text-white">
						<i className="bg-[#B71C1C] rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-[#B71C1C]/90 transition">
							<FaFacebookF />
						</i>
						<i className="bg-[#B71C1C] rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-[#B71C1C]/90 transition">
							<FaLinkedinIn />
						</i>
						<i className="bg-[#B71C1C] rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-[#B71C1C]/90 transition">
							<FaXTwitter />
						</i>
						<i className="bg-[#B71C1C] rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-[#B71C1C]/90 transition">
							<FaYoutube />
						</i>
					</div>
				</div>
			</div>
		</footer>
	);
}
