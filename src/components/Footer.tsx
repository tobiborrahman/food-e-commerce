import { FaFacebookF } from 'react-icons/fa';
import { FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FaYoutube } from 'react-icons/fa';
import { MdOutlinePhone } from 'react-icons/md';
import { CiLocationOn } from 'react-icons/ci';
import { CiMail } from 'react-icons/ci';

export default function Footer() {
	return (
		<footer className="bg-white">
			<div className="py-14 flex flex-col sm:flex-row justify-between max-w-[1200px] mx-auto text-sm text-gray-600">
				<div className="flex flex-col gap-4">
					<h2 className="text-[39px] font-semibold text-[#B71C1C] mb-4">
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

				<div>
					<h3 className="font-semibold mb-6">Information</h3>
					<ul className="space-y-4">
						<li>Shipping & Returns</li>
						<li>About Us</li>
						<li>Terms & Conditions</li>
					</ul>
				</div>

				<div>
					<h3 className="font-semibold mb-2">Follow Us</h3>
					<div className="flex gap-3 text-white">
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
