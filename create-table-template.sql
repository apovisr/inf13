use exampledb;

create table User(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);

create table group(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(80) NOT NULL,
    description VARCHAR(100)
);

create table groupMember(
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId int NOT NULL,
    groupId int NOT NULL
)

alter table `groupMember`
    add constraint fk_user
        foreign key (userId) references `user`(id);

alter table `groupMember`
    add constraint fk_group_1
        foreign key (groupId) references `group`(id);

alter table `groupMember`
    add constraint unique_user_group
        unique (userId, groupId);

drop table settlement;

create table settlement(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    fromGroupMemberId int NOT NULL,
    toGroupMemberId int NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
)

alter Table settlement
    add constraint fk_fromGroupMember
        foreign key (fromGroupMemberId) references `groupMember`(id);
alter Table settlement  
    add constraint fk_toGroupMember
        foreign key (toGroupMemberId) references `groupMember`(id);

CREATE Table expense(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(80),
    groupMemberId int NOT NULL,
    totalAmount DECIMAL(10, 2) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
)

alter Table expense
    add constraint fk_groupMember
        foreign key (groupMemberId) references `groupMember`(id);

CREATE Table expenseSplit(
    id INT PRIMARY KEY AUTO_INCREMENT,
    expenseId int NOT NULL,
    groupMemberId int NOT NULL,
    amount DECIMAL(10, 2) NOT NULL
)

alter Table expenseSplit
    add constraint fk_expense
        foreign key (expenseId) references `expense`(id);
alter Table expenseSplit
    add constraint fk_groupMember_1
        foreign key (groupMemberId) references `groupMember`(id);