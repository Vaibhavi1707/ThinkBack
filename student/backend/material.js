
export function findCoursesByName(courseName) 
{
    return {
        "Query": courseName,
        "Task": "Search by course name and get folder or a list of folders of courses containing the query str"
    };
}

export function findNotesByCourseAndDate(courseName, date)
{
    return {
        "Date": date,
        "Query": courseName,
        "Task": "Search by course and date to get exact pdf"
    };
}

export function downloadNotesByCourseDate(courseName, date)
{
    return {
        "Course": courseName,
        "Date": date,
        "Task": "Downloading pdf"
    };
}

export function findNotesByCourse(courseName)
{
    return {
        "Course": courseName,
        "Task": "All pdfs from " + courseName + " are here"
    };
}