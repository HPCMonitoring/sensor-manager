import { Sidebar } from 'flowbite-react';
import {
	ArrowRightOnRectangleIcon,
	BellAlertIcon,
	MoonIcon,
	Squares2X2Icon,
	SunIcon,
	WrenchScrewdriverIcon
} from '@heroicons/react/24/solid';
import { useClusterExpandStore, useClustersStore, useDarkThemeStore } from '@states';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '../assets/vite.svg';
import { DEFAULT_PATH } from '@constants';

export function AppSidebar() {
	const darkTheme = useDarkThemeStore((state) => state.dark);
	const toggleDarkTheme = useDarkThemeStore((state) => state.toggleTheme);
	const clusters = useClustersStore((state) => state.clusters);
	const {
		isExpand: clusterExpand,
		expand: expandSidebarClusters,
		collapse: collapseSidebarClusters
	} = useClusterExpandStore();

	const navigate = useNavigate();
	const location = useLocation();

	return (
		<Sidebar aria-label='Default sidebar example' className='fb-sidebar w-64'>
			<div className='flex flex-col h-full'>
				<div className='flex-none'>
					<Sidebar.Logo
						href='#'
						img={Logo}
						imgAlt='Logo'
						onClick={(e) => {
							e.preventDefault();
							navigate('/clusters');
						}}
					>
						BKTracker
					</Sidebar.Logo>
				</div>

				<Sidebar.Items className='flex flex-col justify-between h-full'>
					<Sidebar.ItemGroup>
						{clusters.length > 0 ? (
							<Sidebar.Collapse
								icon={Squares2X2Icon}
								label='Clusters'
								open={clusterExpand}
								onClick={(e) => {
									navigate('/clusters');
									e.preventDefault();
									if (DEFAULT_PATH.includes(location.pathname)) {
										if (clusterExpand) collapseSidebarClusters();
										else expandSidebarClusters();
									}
								}}
								className='cursor-pointer'
							>
								{clusters.map((cluster) => (
									<div
										onClick={(e) => {
											e.preventDefault();
											navigate(`/clusters/${cluster.id}`);
											expandSidebarClusters();
										}}
										key={cluster.id}
										className='cursor-pointer'
									>
										<Sidebar.Item>{cluster.name}</Sidebar.Item>
									</div>
								))}
							</Sidebar.Collapse>
						) : (
							<div
								onClick={(e) => {
									e.preventDefault();
									navigate(`/clusters`);
								}}
							>
								<Sidebar.Item icon={Squares2X2Icon} className='cursor-pointer'>
									Clusters
								</Sidebar.Item>
							</div>
						)}

						<div
							onClick={(e) => {
								e.preventDefault();
								navigate(`/notifications`);
							}}
						>
							<Sidebar.Item icon={BellAlertIcon} label='3' className='cursor-pointer'>
								Notifications
							</Sidebar.Item>
						</div>

						<div
							onClick={(e) => {
								e.preventDefault();
								navigate(`/settings`);
							}}
						>
							<Sidebar.Item icon={WrenchScrewdriverIcon} className='cursor-pointer'>
								Settings
							</Sidebar.Item>
						</div>
					</Sidebar.ItemGroup>

					<div>
						<Sidebar.ItemGroup onClick={toggleDarkTheme}>
							<Sidebar.Item icon={darkTheme ? SunIcon : MoonIcon} className='cursor-pointer'>
								{'Use ' + (darkTheme ? 'light' : 'dark') + ' theme'}
							</Sidebar.Item>
						</Sidebar.ItemGroup>
						<Sidebar.ItemGroup>
							<Sidebar.Item icon={ArrowRightOnRectangleIcon} className='cursor-pointer'>
								Sign out
							</Sidebar.Item>
						</Sidebar.ItemGroup>
					</div>
				</Sidebar.Items>
			</div>
		</Sidebar>
	);
}
