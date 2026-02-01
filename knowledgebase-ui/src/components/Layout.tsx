import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, MessageSquare } from 'lucide-react';
import clsx from 'clsx';

const Layout = () => {
	const location = useLocation();

	const navItems = [
		{ name: 'Documents', path: '/', icon: FileText },
		{ name: 'Prompt Templates', path: '/prompts', icon: MessageSquare },
	];

	return (
		<div className="flex h-screen bg-gray-900 text-white">
			{/* Sidebar */}
			<div className="w-64 bg-gray-800 border-r border-gray-700 p-4">
				<div className="flex items-center gap-2 mb-8 px-2">
					<div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
						<LayoutDashboard size={20} />
					</div>
					<h1 className="text-xl font-bold">Knowledge Base</h1>
				</div>

				<nav className="space-y-1">
					{navItems.map((item) => {
						const Icon = item.icon;
						const isActive = location.pathname === item.path;
						return (
							<Link
								key={item.path}
								to={item.path}
								className={clsx(
									'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
									isActive
										? 'bg-blue-600 text-white'
										: 'text-gray-400 hover:bg-gray-700 hover:text-white'
								)}
							>
								<Icon size={20} />
								<span>{item.name}</span>
							</Link>
						);
					})}
				</nav>
			</div>

			{/* Main Content */}
			<div className="flex-1 overflow-auto">
				<div className="p-8">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default Layout;
