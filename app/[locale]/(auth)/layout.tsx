import { getLocale } from "next-intl/server";
import Image from "next/image";
import { ReactNode } from "react";
import { Slide, ToastContainer } from "react-toastify";

type Props = {
  children: ReactNode;
};
export default async function AuthLayout({ children }: Props) {
  const getLang = await getLocale();
  return (
		<div className='min-h-dvh grid grid-cols-1 md:grid-cols-12 gap-4 w-full mx-auto p-4 md:p-8 overflow-y-auto'>
			<div className='col-span-1 w-full flex md:block md:col-span-6 relative min-h-[80px]'>
				<Image
					src='/webp/login/authentication-06.svg'
					alt='logo-login-page'
					fill
					className='object-contain'
					priority
				/>
			</div>
			<div className='col-span-1 md:col-span-6 flex items-center justify-center'>
				{children}
			</div>
			<ToastContainer
				position={getLang === 'fa' ? 'top-right' : 'top-left'}
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={getLang === 'fa' ? true : false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='light'
				transition={Slide}
			/>
		</div>
	);
}
