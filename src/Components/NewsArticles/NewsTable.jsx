import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Image from 'material-ui-image';

export default function NewsTable({ rows, toggleSort, sort }) {
	return (
		<TableContainer
			component={Paper}
			elevation={3}
			style={{ width: '98%', margin: 'auto' }}
		>
			<Table aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell align="center">Image</TableCell>
						<TableCell align="center">Source</TableCell>
						<TableCell align="center">Author</TableCell>
						<TableCell align="center">Title</TableCell>
						{/* <TableCell align="center">Article</TableCell> */}
						<TableCell
							style={{
								display: 'grid',
								placeItems: 'center',
								gridTemplateColumns: 'auto auto',
							}}
						>
							Date
							<button
								onClick={() => toggleSort()}
								style={{
									border: 'none',
									background: 'white',
								}}
							>
								{sort === 1 ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
							</button>
						</TableCell>
						<TableCell align="center">URL</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow
							key={
								+new Date(row.publishedAt) + row.title.slice(0, 20) + row.source
							}
						>
							<TableCell style={{ width: '20%' }} align="center">
								{!row.urlToImage ? (
									'No Image'
								) : (
									<Image src={row.urlToImage} aspectRatio={16 / 9} />
								)}
							</TableCell>
							<TableCell>{row.source.name}</TableCell>
							<TableCell>
								{!row.author
									? 'Unknown'
									: row.author.length > 20 && row.author.indexOf(' ') === -1
									? `${row.author.slice(
											0,
											Math.floor(row.author.length / 2),
									  )} ${row.author.slice(Math.floor(row.author.length / 2))}`
									: row.author}
							</TableCell>
							<TableCell>{row.title}</TableCell>
							{/* <TableCell>
								{!row.content
									? 'Not Received'
									: row.content.split(' ').slice(0, 20).join(' ') + '...'}
							</TableCell> */}
							<TableCell>
								{new Date(row.publishedAt).toLocaleString()}
							</TableCell>
							<TableCell>
								{
									<Button
										style={{ fontSize: 11, padding: 5 }}
										size="small"
										variant="contained"
										// color="primary"
										onClick={() => window.open(row.url)}
									>
										Read Full Article
									</Button>
								}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
