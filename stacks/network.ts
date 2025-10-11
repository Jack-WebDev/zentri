export function Network() {
	const vpc = new sst.aws.Vpc("Vpc", {
		az: 3,
		transform: {
			vpc: (args) => {
				args.tags = {
					...(args.tags ?? {}),
					Name: `${$app.name}-${$app.stage}-vpc`,
				};
			},
		},
	});

	const webSg = new aws.ec2.SecurityGroup("web-sg", {
		vpcId: vpc.id,
		description: "Allow HTTP/HTTPS and SSH",
		tags: { Name: `${$app.name}-${$app.stage}-web-sg` },
	});

	new aws.vpc.SecurityGroupIngressRule("web-80", {
		securityGroupId: webSg.id,
		ipProtocol: "tcp",
		fromPort: 80,
		toPort: 80,
		cidrIpv4: "0.0.0.0/0",
		description: "HTTP from anywhere",
	});

	new aws.vpc.SecurityGroupIngressRule("web-443", {
		securityGroupId: webSg.id,
		ipProtocol: "tcp",
		fromPort: 443,
		toPort: 443,
		cidrIpv4: "0.0.0.0/0",
		description: "HTTPS from anywhere",
	});

	new aws.vpc.SecurityGroupIngressRule("web-22", {
		securityGroupId: webSg.id,
		ipProtocol: "tcp",
		fromPort: 22,
		toPort: 22,
		cidrIpv4: "0.0.0.0/0",
		description: "SSH from anywhere (not recommended for prod)",
	});

	new aws.vpc.SecurityGroupEgressRule("web-egress-all", {
		securityGroupId: webSg.id,
		ipProtocol: "-1",
		cidrIpv4: "0.0.0.0/0",
		description: "Allow all outbound",
	});

	return {
		vpc,
		vpcId: vpc.id,
		publicSubnetIds: vpc.publicSubnets,
		securityGroupId: webSg.id,
	};
}
