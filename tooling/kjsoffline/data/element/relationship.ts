import type { Tagged } from "type-fest"

export class Relationship<T extends string> {
	constructor(
		readonly name: T,
		readonly label: string,
	) {}
}

export namespace Relationship {
	export type Value = Tagged<string, "Relationship">

	export const INHERITS = new Relationship("INHERITS", "Inherits")
	export const SUPER_CLASS = new Relationship("SUPER_CLASS", "Super Class")
	export const INHERITED_BY = new Relationship("INHERITED_BY", "Inherited By")
	export const REFERENCES = new Relationship("REFERENCES", "References")
	export const REFERENCED_BY = new Relationship(
		"REFERENCED_BY",
		"Referenced By",
	)
	export const FIELD_TYPE = new Relationship("FIELD_TYPE", "Field Type")
	export const METHOD_RETURN_TYPE = new Relationship(
		"METHOD_RETURN_TYPE",
		"Method Return Type",
	)
	export const PARAMETER_TYPE = new Relationship(
		"PARAMETER_TYPE",
		"Parameter Type",
	)
	export const CONSTRUCTOR_PARAMETER_TYPE = new Relationship(
		"CONSTRUCTOR_PARAMETER_TYPE",
		"Constructor Parameter Type",
	)
	export const METHOD_PARAMETER_TYPE = new Relationship(
		"METHOD_PARAMETER_TYPE",
		"Method Parameter Type",
	)
	export const TYPE_VARIABLE_OF = new Relationship(
		"TYPE_VARIABLE_OF",
		"Type Variable Of",
	)
	export const COMPONENT_OF = new Relationship("COMPONENT_OF", "Component Of")
	export const DECLARING_CLASS = new Relationship(
		"DECLARING_CLASS",
		"Declaring Class",
	)
	export const DECLARES_CLASS = new Relationship(
		"DECLARES_CLASS",
		"Declares Class",
	)
	export const ENCLOSING_CLASS = new Relationship(
		"ENCLOSING_CLASS",
		"Enclosing Class",
	)
	export const ENCLOSES_CLASS = new Relationship(
		"ENCLOSES_CLASS",
		"Encloses Class",
	)
	export const PARAMETERIZED_VARIANT = new Relationship(
		"PARAMETERIZED_VARIANT",
		"Parameterized Variant",
	)
	export const RAW_TYPE = new Relationship("RAW_TYPE", "Raw Type")
	export const OWNER_TYPE = new Relationship("OWNER_TYPE", "Owner Type")
	export const TYPE_VARIABLE_BOUNDS = new Relationship(
		"TYPE_VARIABLE_BOUNDS",
		"Type Variable Bounds",
	)
	export const LOWER_BOUND = new Relationship("LOWER_BOUND", "Lower Bound")
	export const UPPER_BOUND = new Relationship("UPPER_BOUND", "Upper Bound")
	export const BOUNDED_WITHIN = new Relationship(
		"BOUNDED_WITHIN",
		"Bounded Within",
	)
	export const NEIGHBOR = new Relationship("NEIGHBOR", "Neighbor")
	export const SIBLING = new Relationship("SIBLING", "Sibling")
	export const ROOMMATE = new Relationship("ROOMMATE", "Roommate")
}
