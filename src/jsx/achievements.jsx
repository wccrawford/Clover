import React from 'react';
import AchievementData from './achievementdata.js';

class Achievements extends React.Component {
	render() {
		var achievements = Object.keys(AchievementData).map((key, index) => {
			var title = '???'
			var description = '???';
			if(this.props.achievements.indexOf(key) !== -1) {
				var achievement = AchievementData[key];
				title = achievement.title;
				description = achievement.description;
			}
			return (
				<div className="achievement col-sm-6" key={key}>
					<div className="border">
						<div className="title">{title}</div>
						<div className="description">{description}</div>
					</div>
				</div>
			);
		});
		return (
			<div className="container-fluid">
				<div className="row">
					{achievements}
				</div>
			</div>
		);
	}
}

export default Achievements;