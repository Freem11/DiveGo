import { Button } from 'reactstrap';
import CloseIcon from '@mui/icons-material/Close';

const CloseButton = ({ onClick, className, btnStyle }) => {
	return (
		<div className='column col-1'>
			<Button
				variant='text'
				className={className}
				onClick={onClick}
				style={{
					display: 'flex',
					flexDirection: 'column',
					backgroundColor: 'transparent',
					border: 'none',
					cursor: 'pointer',
				}}
			>
				<CloseIcon
					sx={{
						color: '#F0EEEB',
						width: '2vw',
						height: '5vh',
						cursor: 'pointer',
						marginRight: '-3px',
					}}
				></CloseIcon>
			</Button>
		</div>
	);
};

export default CloseButton;
