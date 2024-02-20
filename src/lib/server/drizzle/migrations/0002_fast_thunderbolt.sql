ALTER TABLE `cards` MODIFY COLUMN `question` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `cards` MODIFY COLUMN `answer` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `cards` MODIFY COLUMN `category` enum('FIRST','SECOND','THIRD','FOURTH','FIFTH','SIXTH','SEVENTH','DONE') NOT NULL;--> statement-breakpoint
ALTER TABLE `cards` ADD `last_answered_at` datetime;